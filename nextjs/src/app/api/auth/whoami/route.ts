import getClientSession from "@/src/app/actions/mongodb/getClientSession";
import { Cookie } from "@/types/cookies";
import { Reason } from "@/types/login";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST request handler for user session validation.
 *
 * @param req - The incoming NextRequest object.
 * @returns A NextResponse object with JSON data and appropriate status code.
 */
export async function POST(req: NextRequest) {
    // Initialize a NextResponse object
    const res = NextResponse;

    // Extract the cookie from the request body
    const { cookie }: Cookie = await req.json();

    // Determine the IP address based on the environment
    const ip = process.env.NODE_ENV === "development" ? "localhost" : req.headers.get("x-forwarded-for");

    // Check if both IP and cookie are available
    if (ip && cookie) {
        // Call getClientSession function to validate the user session
        const { user }: Reason = await getClientSession({ session: { ip, sessionId: cookie.value } });

        // Prepare the session data
        const session = { name: user.name, sessionId: user.session.sessionId, ip: user.session.ip };

        // Check if the user session is valid
        if (!user.error) {
            // Return a JSON response with the session data and OK status
            return res.json(session, { status: 200, statusText: "OK" });
        } else {
            // Return a JSON response with an empty user object and a session not found status
            return res.json({ user: { name: "", sessionId: "" } }, { status: 400, statusText: "Session not found" });
        }
    }
}
