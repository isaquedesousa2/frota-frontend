import { NextResponse } from 'next/server';
import { getAPIServer } from '../../../services/api';

export async function GET(req: Request) {
    const { status, data } = await getAPIServer()
        .get('/api/v1/multas')
        .catch((err) => err.response);

    const response = NextResponse;

    if (status === 500) {
        return response.json({ status, message: 'Error interno do servidor, contate o suporte' }, { status });
    }

    if (status === 401) {
        return response.json({ status: 401, message: 'Unauthorized' }, { status: 401 });
    }

    if (status !== 200) {
        return response.json({ status, message: data.message }, { status });
    }

    return response.json(data, { status });
}
