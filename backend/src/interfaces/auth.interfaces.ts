import { IUser } from "../models/User";

// DTOs para autenticação e sessão
export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse extends Pick<IUser, "token"> {
  user: Pick<IUser, "userId" | "username" | "email">;
} 


export interface ICreateSessionResponse extends Pick<IUser, 'token'> {
    user: IUser;
}

export interface IExternalLoginResponse extends Pick<IUser, 'externalToken'> {}