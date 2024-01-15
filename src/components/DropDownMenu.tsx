import { Fragment, ReactNode, useContext } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { IUser } from '../interfaces/user.interface';
import { AuthContext } from '../contexts/AuthContext';

interface IDropDownMenuProps {
    user: IUser;
    children: ReactNode;
}

export default function DropDownMenu({ user, children }: IDropDownMenuProps) {
    const { signOut } = useContext(AuthContext);

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button>{children}</Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-[#1a262d] border border-[#283943] border-x-[3px] border-y-[3px] text-white  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1 border border-[#283943] border-x-[1px] border-b border-y-0 border-r-0 border-l-0">
                        <span className="block w-full px-4 py-2 text-left text-sm font-bold">{user.name}</span>
                        <span className="block w-full px-4 py-2 text-left text-sm">{user.email}</span>
                    </div>
                    <div className="py-1">
                        <Menu.Item>
                            <button onClick={signOut} type="submit" className="block w-full px-4 py-2 text-left text-sm">
                                Sair
                            </button>
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
