import Input from './components/Input';
import Button from './components/Button';
import './App.css'
import { useState } from 'react';
import { api } from "./api/api";

function App() {

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (credentials) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', credentials);
      // Handle success (save access token, redirect to dashboard)
      localStorage.setItem('accessToken', response.data.accessToken);
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="app">
        <h1>Omnix</h1>
        <Input placeholder={"Enter your Email"} value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder={"Enter your Password"} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button size='md' width='100%' variant='primary' onClick={() => { handleLogin({ email, password }) }}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </>
  )
}

export default App