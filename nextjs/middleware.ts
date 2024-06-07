import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const hasSession = req.cookies.get("sessionId")?.value;
    
    if (hasSession && !req.nextUrl.pathname.startsWith("/clicker")) {
        return Response.redirect(new URL("/clicker", req.url));
    }

    if (!hasSession && !req.nextUrl.pathname.startsWith("/login")) {
        return Response.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
