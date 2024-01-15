import { NextResponse } from 'next/server';
import { getAPIServer } from '../../../../services/api';

export async function GET(req: Request) {
    const { data } = await getAPIServer().get('/api/v1/auth/refresh-user');

    return NextResponse.json(data, { status: 200 });
}
