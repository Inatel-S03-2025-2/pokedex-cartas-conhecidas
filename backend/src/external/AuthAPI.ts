import axios from 'axios';
import { Logger } from '../utils/Logger';
import { IExternalLoginResponse } from '../interfaces';

export class AuthAPI {
    async login(email: string, password: string): Promise<IExternalLoginResponse> {
        try {
            const response = await axios.post(`http://${process.env.AUTENTICATION_SERVICE}/login`, { 
                email, 
                password 
            });
            
            if (response.status === 200 && response.data) {
                Logger.info('AuthAPI login successful', { email });
                return response.data;
            }
            Logger.info('AuthAPI login failed', { email, status: response.status });
            return { externalToken: null };
        } catch (error) {
            Logger.externalAPIError('AuthAPI', '/login', error as Error);
            return { externalToken: null };
        }
    }
}

export const authAPI = new AuthAPI();