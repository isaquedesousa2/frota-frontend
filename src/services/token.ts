import { cookies } from 'next/headers';
import { TOKEN_NAME } from '../constants';

export const getTokenCookie = (): string | undefined => {
    const token = cookies().get(TOKEN_NAME);

    return token?.value;
};

export const deleteToken = () => {
    cookies().delete(TOKEN_NAME);
};
