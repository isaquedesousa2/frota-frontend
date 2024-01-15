import { ReactNode } from 'react';

interface LoadingPulseProps {
    loading: boolean;
    children?: ReactNode;
    className?: string;
}

export function LoadingPulse({ loading, children, className }: LoadingPulseProps) {
    return loading ? <div className={`w-full animate-pulse bg-gray-700 rounded-lg dark:bg-gray-700 ` + className} /> : children;
}
