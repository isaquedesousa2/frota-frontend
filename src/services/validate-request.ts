import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const validateRequest = (router: AppRouterInstance, { status, data }: any) => {
    if (status === 401) {
        return router.push('/auth/login');
    }

    return data;
};
