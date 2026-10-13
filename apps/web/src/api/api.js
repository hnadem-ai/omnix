import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const api = axios.create({
    baseURL: `${API_URL}/api`,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
});

// Request interceptor: Attach access token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor: Handle token expiration automatically
api.interceptors.response.use(
    (response) => response, // If successful, just return the response
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't already retried this request
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Call backend refresh endpoint to get a new access token
                const res = await axios.post('http://localhost:4000/api/auth/refresh-token', {}, {
                    withCredentials: true,
                });

                const newAccessToken = res.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);

                // Update header and retry the original failed request
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // If refresh token has also expired/failed, log user out completely
                localStorage.removeItem('accessToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);