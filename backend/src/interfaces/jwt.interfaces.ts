import { IUser } from '../models/User';

export interface IJWTPayload extends Pick<IUser, 'userId' | 'role'> {}

export interface IVerifyTokenResponse {
    isValid: boolean;
    payload?: IJWTPayload;
}