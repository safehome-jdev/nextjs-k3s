import encodeToBase64 from "@/lib/encodeBase64";
import getClientSession from "@/src/app/actions/mongodb/getClientSession";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const res = NextResponse;
    const data = await req.json();
    const sessionId = data.sessionId as string;
    const ip = process.env.NODE_ENV === "development" ? "localhost" : req.headers.get("x-forwarded-for");

    if (sessionId && ip) {
        try {
            const isSessionValid = await getClientSession({ session: { ip: ip, sessionId: sessionId } });

            if (!isSessionValid.user.error) {
                const reason = encodeToBase64({ ...isSessionValid, user: { message: "Successfully logged in" } });
                return res.json(reason, { status: 200, statusText: "OK" });
            } else {
                const reason = encodeToBase64({ ...isSessionValid, user: { message: "User not found" } });
                return res.json(reason, { status: 401, statusText: "Unauthorized" });
            }
        } catch (error) {
            console.error({ function: "auth/pages/api/auth/session", error });
            return res.json({ error: "Internal Server Error" }, { status: 500, statusText: "Internal Server Error" });
        }
    }

    return res.json({ error: "Invalid request" }, { status: 400, statusText: "Bad Request" });
}
