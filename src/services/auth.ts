import axios from 'axios';
import { IUser } from '../interfaces/user.interface';

export const signInRequest = async ({ username, password }: ISignInData) => {
    const { status, data } = await axios
        .post('/api/auth/login', {
            username,
            password,
        })
        .catch((err) => err.response);

    if (status === 401) {
        throw new Error('Usuário ou senha incorretos');
    }

    if (status === 500) {
        throw new Error('Error interno do servidor, contate o suporte');
    }

    const { token, user } = data;

    return { token, user };
};

export const signOutRequest = (res: Response) => {};

export const firstAccessRequest = async (password: string): Promise<number> => {
    const { status } = await axios.post('/api/auth/first-access', { password });

    return status;
};

export const refreshUserDataRequest = async (): Promise<IUser> => {
    const { data } = await axios.get('/api/auth/refresh-user').catch((err) => err.response);

    return data;
};
