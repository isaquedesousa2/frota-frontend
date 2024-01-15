'use client';

import classNames from 'classnames';
import { SyntheticEvent, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

const FirstAccessPage = () => {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { firstAccess } = useContext(AuthContext);

    const router = useRouter();

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        if (password.length <= 8) {
            setError('Senha deve ter no mínimo 8 caracteres.');
        }

        if (password !== passwordConfirm) {
            setError('Senhas não são iguais. ');
        }

        if (error) {
            setLoading(false);
            return;
        }

        const isAuthorized = await firstAccess(password);

        if (isAuthorized) {
            router.replace('/multas');
        } else {
            setError('Falha na requisição...');
        }

        setLoading(false);
    };

    return (
        <main className="flex gap-8 w-full min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-t from-[#141e22] from-50 to-[#141e22]">
            <div className="flex flex-col items-center text-start w-full max-w-[500px] gap-6">
                <span className="text-lg">Altere sua senha no seu primeiro acesso</span>
                <form onSubmit={handleSubmit} className="flex flex-col w-full gap-8">
                    <div className="relative">
                        <input
                            required
                            type="password"
                            value={password}
                            disabled={loading}
                            autoComplete="false"
                            placeholder="Digite sua senha..."
                            onChange={(e) => setPassword(e.target.value)}
                            className={classNames(
                                'w-full p-3 pe-10 text-sm  border border-x-[3px] border-y-[3px] border-[#1e2b33] rounded-lg bg-[#0f171a] focus:outline-none focus:border-[#60dc96]',
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
                    <div className="relative">
                        <input
                            required
                            type="password"
                            value={passwordConfirm}
                            disabled={loading}
                            autoComplete="false"
                            placeholder="Confirme a senha..."
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            className={classNames(
                                'w-full p-3 pe-10 text-sm  border border-x-[3px] border-y-[3px] border-[#1e2b33] rounded-lg bg-[#0f171a] focus:outline-none focus:border-[#60dc96]',
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

export default FirstAccessPage;
