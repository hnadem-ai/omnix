interface UserModel {
    id?: string,
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export type { UserModel };
export type CreateUserInput = Omit<UserModel, 'id'>;
export type UpdateUserInput = Partial<Omit<UserModel, 'email'>>; // e.g. email can't change, rest are optional
export type LoginInput = Pick<UserModel, 'email' | 'password'>;
export type UserResponse = Omit<UserModel, 'password'>;
export type TokenPayload = Omit<UserModel, 'password' | 'firstName' | 'lastName'>; // e.g. only id and email are included in the token payload