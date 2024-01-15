'use client';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { destroyCookie, setCookie } from 'nookies';
import { IUser } from '../interfaces/user.interface';
import { useRouter, usePathname } from 'next/navigation';
import { signInRequest, refreshUserDataRequest, firstAccessRequest } from '../services/auth';
import { TOKEN_NAME } from '../constants';

interface IAuthProviderProps {
    children: ReactNode;
}

interface IAuthContext {
    user: IUser | null;
    signIn: (data: ISignInData) => Promise<void>;
    signOut: () => Promise<void>;
    firstAccess: (password: string) => Promise<boolean>;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
    const [user, setUser] = useState<IUser | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (pathname === '/auth/login' || pathname === '/') return;

        refresh();
    }, []);

    async function signIn({ username, password }: ISignInData) {
        const { token, user } = await signInRequest({ username, password });

        setCookie(undefined, String(TOKEN_NAME), token, {
            path: '/',
            maxAge: 60 * 60 * 8, // 8 hours
        });

        setUser(user);

        router.replace('/multas');
    }

    async function signOut() {
        destroyCookie(undefined, TOKEN_NAME);
        destroyCookie(undefined, TOKEN_NAME);
        router.replace('/auth/login');
    }

    const refresh = async () => {
        const res = await refreshUserDataRequest();

        setUser(res);
    };

    const firstAccess = async (password: string) => {
        try {
            await firstAccessRequest(password);

            return true;
        } catch (e) {
            return false;
        }
    };

    return <AuthContext.Provider value={{ user, signIn, signOut, firstAccess }}>{children}</AuthContext.Provider>;
};
