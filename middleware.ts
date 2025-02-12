import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {blacklistResponse} from "~/data/blacklist-response";

const blockedHost = 'Validator.nu/LV https://validator.w3.org/services';

export function middleware(request: NextRequest) {
    const agent = request.headers.get('User-Agent');

    if (agent === blockedHost) {
        return new NextResponse(blacklistResponse, {
            status: 200,
            headers: { 'Content-Type': 'text/html' },
        });
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/:path*',
};
