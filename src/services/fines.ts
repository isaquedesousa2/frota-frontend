'use client';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateRequest } from './validate-request';

export function finesService() {
    const [error, setError] = useState('');
    const [loading, setloading] = useState<boolean>();
    const router = useRouter();

    async function getFines(): Promise<IFinesRes[] | undefined> {
        setloading(true);
        setError('');

        try {
            const data = await axios.get('/api/multas').catch((err) => err.response);

            return validateRequest(router, data);
        } catch (err: any) {
            setError(err.message);
            setloading(false);
        } finally {
            setloading(false);
        }
    }

    return {
        error,
        loading,
        getFines,
    };
}
