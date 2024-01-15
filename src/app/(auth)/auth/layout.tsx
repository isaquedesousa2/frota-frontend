import { ReactNode } from 'react';

interface PrivateLayoutProps {
    children: ReactNode;
}

export default async function PrivateLayoutAuth({ children }: PrivateLayoutProps) {
    return <>{children}</>;
}
