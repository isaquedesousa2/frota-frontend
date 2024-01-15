import { NextRequest, NextResponse } from 'next/server';
import { TOKEN_NAME } from './constants';
import { IUser } from './interfaces/user.interface';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get(TOKEN_NAME)?.value;
    const urlValidate = `${process.env.URL_BACKEND}/api/v1/auth/validate`;
    const refreshUserURL = `${process.env.URL_BACKEND}/api/v1/auth/refresh-user`;
    const pathname = request.nextUrl.pathname;

    const pathnameLogin = '/auth/login';
    const pathnameFirstAccess = '/auth/primeiro-acesso';
    const pathnameFines = '/multas';

    // if (pathname.startsWith(`/api/`)) {
    //     if (request.headers.get('refer') !== '3da1r4@#@') {
    //         return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    //     }
    // }

    console.log(request.headers.get('Authorization'));

    if (!pathname.startsWith(`/api/`)) {
        if (pathname === '/') {
            return NextResponse.redirect(new URL(pathnameLogin, request.url));
        }

        if (pathname === pathnameLogin && token) {
            return NextResponse.redirect(new URL(pathnameFines, request.url));
        }

        if (!token && pathname !== pathnameLogin) {
            return NextResponse.redirect(new URL(pathnameLogin, request.url));
        }

        if (pathname !== pathnameLogin) {
            const res = await fetch(urlValidate, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            if (res.status !== 201) {
                const redirect = NextResponse.redirect(new URL(pathnameLogin, request.url));
                redirect.cookies.delete(TOKEN_NAME);

                return redirect;
            }

            const userRes = await fetch(refreshUserURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            });

            const user: IUser = await userRes.json();

            if (pathname !== pathnameFirstAccess && !user.firstAccess) {
                return NextResponse.redirect(new URL(pathnameFirstAccess, request.url));
            }

            if (pathname === pathnameFirstAccess && user.firstAccess) {
                return NextResponse.redirect(new URL(pathnameFines, request.url));
            }

            if (pathname !== pathnameFirstAccess && user.firstAccess) {
                return NextResponse.next();
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/((?!auth|_next/static|_next/image|favicon.ico).*)',
};
