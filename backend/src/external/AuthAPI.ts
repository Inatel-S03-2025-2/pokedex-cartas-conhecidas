import axios from 'axios';

interface ILoginResponse {
    user: {
        userId: number;
        email: string;
        role: string;
    };
    token: string;
}

interface ILoginParams {
    email: string;
    password: string;
}

export class AuthAPI {
    async login({email, password}: ILoginParams): Promise<ILoginResponse | null> {
        const response = await axios.post(`http://${process.env.AUTENTICATION_SERVICE}/login`, { email, password });
        return response.data;
    }
}

export const authAPI = new AuthAPI();