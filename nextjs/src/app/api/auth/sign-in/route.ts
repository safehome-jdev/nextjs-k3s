import { createClientSession } from "@/src/app/actions/mongodb/createClientSession";
import getUser from "@/src/app/actions/mongodb/getUser";
import { Session } from "@/types/cookies";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handles the POST request for user sign-in.
 *
 * @param req - The incoming NextRequest object.
 * @returns A NextResponse object with appropriate JSON data and status code.
 */
export async function POST(req: NextRequest) {
    const res = NextResponse;
    const data = await req.json();
    const name = data.name as string;
    const ip = process.env.NODE_ENV === "development" ? "localhost" : req.headers.get("x-forwarded-for");

    // Check if name and IP are provided
    if (name && ip) {
        try {
            // Fetch user details from the database
            const { user } = await getUser({ name, ip });
            console.log({ user });

            // If user is not found, return 401 Unauthorized
            // @ts-ignore - we're returning an object with an unauthorized property if the user is not found
            if (user.error) {
                const reason = { user: { name: name, error: true, message: "User not found" } };
                return res.json(reason, { status: 401, statusText: "Unauthorized" });
            }

            // Create a client session for the user
            const createUserSession = await createClientSession({ user });

            // If there's an error creating the session, return 500 Internal Server Error
            if (createUserSession.user.error) {
                return res.json(
                    { error: "Internal Server Error" },
                    { status: 500, statusText: "Internal Server Error" }
                );
            }

            // Prepare the session data for response
            const reason: Session = {
                name,
                sessionId: createUserSession.user.session.sessionId,
                ip: createUserSession.user.session.ip,
            };

            // Return the session data with 200 OK status
            return res.json(reason, { status: 200, statusText: "OK" });
        } catch (error) {
            // Log the error and return 500 Internal Server Error
            console.error({ function: "auth/pages/api/auth/sign-in", error });
            return res.json({ error: "Internal Server Error" }, { status: 500, statusText: "Internal Server Error" });
        }
    }

    // If name or IP is not provided, return 400 Bad Request
    return res.json({ error: "Invalid request" }, { status: 400, statusText: "Bad Request" });
}
