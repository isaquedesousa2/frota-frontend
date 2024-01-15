import { NextResponse } from 'next/server';
import { getAPIServer } from '../../../../services/api';

export async function POST(req: Request) {
    const { password } = await req.json();

    const { status } = await getAPIServer().post('/api/v1/auth/first-access', { password });

    return NextResponse.json({ status: status });
}
