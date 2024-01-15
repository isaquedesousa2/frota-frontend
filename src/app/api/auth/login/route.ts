import { NextResponse } from 'next/server';
import { getAPIServer } from '../../../../services/api';

export async function POST(req: Request) {
    const { username, password } = await req.json();

    const { status, data } = await getAPIServer()
        .post('/api/v1/auth/login', { username, password })
        .catch((error) => error.response);

    if (status !== 201) {
        return NextResponse.json({ status: 401, message: 'Usuário ou senha incorretos.' }, { status: 401 });
    }

    if (status === 500) {
        return NextResponse.json({ status, message: 'Error interno do servidor, contate o suporte' }, { status });
    }

    if (status === 401) {
        return NextResponse.json({ status: 401, message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(data, { status });
}
