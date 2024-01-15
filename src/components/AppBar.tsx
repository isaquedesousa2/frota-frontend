'use client';
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import DropDownMenu from './DropDownMenu';

export default function AppBar() {
    const { user } = useContext(AuthContext);

    return (
        <nav className="w-full min-h-14 flex flex-row justify-between">
            <div className="flex items-center justify-center gap-8">
                <span className="font-bold text-2xl">Frota</span>
            </div>
            <div>
                <Link href="/multas">
                    <div className="border border-[#283943] border-x-[3px] border-y-[3px] rounded-full flex flex-row items-center px-5 py-2 gap-4 bg-[#1a262d]">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512">
                            <path
                                fill="#60dc96"
                                d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384v38.6C310.1 219.5 256 287.4 256 368c0 59.1 29.1 111.3 73.7 143.3c-3.2 .5-6.4 .7-9.7 .7H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zm48 96a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm0 240a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm0-192c-8.8 0-16 7.2-16 16v80c0 8.8 7.2 16 16 16s16-7.2 16-16V288c0-8.8-7.2-16-16-16z"
                            />
                        </svg>
                        <span className="font-semibold">Multas</span>
                    </div>
                </Link>
            </div>
            <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full">
                {user ? (
                    <DropDownMenu user={user}>
                        <span className="bg-[#fed339] text-black font-bold w-[40px] h-[40px] flex items-center justify-center rounded-full">
                            {user?.name[0]}
                        </span>
                    </DropDownMenu>
                ) : (
                    <div className="w-10 h-10 animate-pulse bg-gray-700 rounded-full dark:bg-gray-700" />
                )}
            </div>
        </nav>
    );
}
