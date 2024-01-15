'use client';
import { SyntheticEvent, useContext, useState } from 'react';
import classNames from 'classnames';
import { AuthContext } from '../../contexts/AuthContext';
import Image from 'next/image';
import Logo from '../../assets/logoEstrela.png';

export const LoginPageComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { signIn } = useContext(AuthContext);

    async function login(event: SyntheticEvent) {
        event.preventDefault();
        setLoading(true);
        setError('');

        await signIn({ username, password }).catch((err) => setError(err.message));

        setLoading(false);
    }

    return (
        <main className="flex gap-8 w-full min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-t from-[#141e22] from-50 to-[#141e22]">
            <div className="flex flex-col items-center text-start w-full max-w-[500px] gap-6">
                <div className="flex items-center justify-center gap-8">
                    <Image alt="" src={Logo} width={60} />
                    <span className="font-bold text-3xl">Frota</span>
                </div>
                <form onSubmit={login} className="flex flex-col w-full gap-8">
                    <div className="relative">
                        <input
                            required
                            type="text"
                            id="username"
                            disabled={loading}
                            placeholder="Digite seu usuário..."
                            onChange={(e) => setUsername(e.target.value)}
                            className={classNames(
                                'w-full p-3 text-sm  border border-x-[3px] border-y-[3px] border-[#1e2b33] rounded-lg bg-[#0f171a] focus:outline-none focus:border-[#60dc96]',
                                {
                                    'border-[#e83a70]': error,
                                },
                            )}
                        />
                        <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                            {error ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="3"
                                    stroke="currentColor"
                                    className="w-4 h-4 text-[#e83a70]"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="3"
                                    stroke="currentColor"
                                    className="w-4 h-4 dark:text-[#1e2b33]"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                    />
                                </svg>
                            )}
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            required
                            id="password"
                            type="password"
                            disabled={loading}
                            placeholder="Digite sua senha..."
                            onChange={(e) => setPassword(e.target.value)}
                            className={classNames(
                                'w-full p-3 text-sm  border border-x-[3px] border-y-[3px] border-[#1e2b33] rounded-lg bg-[#0f171a] focus:outline-none focus:border-[#60dc96]',
                                {
                                    'border-[#e83a70]': error,
                                },
                            )}
                        />
                        <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                            {error ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="3"
                                    stroke="currentColor"
                                    className="w-4 h-4 text-[#e83a70]"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="3"
                                    stroke="currentColor"
                                    className="w-4 h-4 dark:text-[#1e2b33]"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                                    />
                                </svg>
                            )}
                        </div>
                    </div>

                    <button disabled={loading} type="submit" className="bg-[#60dc96] text-black font-semibold rounded-lg py-3 text-center">
                        Acessar
                    </button>
                    {error && <span className="text-[#e83a70]">{error}</span>}
                </form>
            </div>
        </main>
    );
};
