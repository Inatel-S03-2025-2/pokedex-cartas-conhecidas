import axios from 'axios';

export interface IExternalLoginResponse {
  email: string;
  token: string;
}

export class AuthAPI {
    async login(email: string, password: string): Promise<IExternalLoginResponse | null> {
        try {
            const response = await axios.post(`http://${process.env.AUTENTICATION_SERVICE}/login`, { 
                email, 
                password 
            });
            
            if (response.status === 200 && response.data) {
                return response.data;
            }
            
            return null;
        } catch (error) {
            console.error('Erro ao fazer login no AuthAPI:', error);
            return null;
        }
    }
}

export const authAPI = new AuthAPI();