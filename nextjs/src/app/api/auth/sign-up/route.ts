import { generateSessionId } from "@/lib/createSessionId";
import encodeToBase64 from "@/lib/encodeBase64";
import createUser from "@/src/app/actions/mongodb/createUser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const res = NextResponse;
    const data = await req.json();
    const name = data.name as string;
    const ip = process.env.NODE_ENV === "development" ? "localhost" : req.headers.get("x-forwarded-for");

    if (name && ip) {
        try {
            const sessionId = generateSessionId();
            const { user } = await createUser({ name, session: { ip, sessionId } });

            console.log({ newUser: user });

            if (user) {
                const reason = encodeToBase64({
                    user: { id: user.id, name: user.name, message: "successfully created" },
                });
                return res.json(
                    {
                        redirect: encodeURI(`/auth/login?reason=${reason}`),
                    },
                    { status: 200, statusText: "OK" }
                );
            } else {
                return res.json(
                    { error: "Unable to create user" },
                    { status: 500, statusText: "Internal Server Error" }
                );
            }
        } catch (error) {
            return res.json({ error: "Unable to create user" }, { status: 500, statusText: "Internal Server Error" });
        }
    }
    return res.json({ error: "Invalid request" }, { status: 400, statusText: "Bad Request" });
}
