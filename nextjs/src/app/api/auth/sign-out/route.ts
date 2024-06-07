import deleteClientSession from "@/src/app/actions/mongodb/deleteClientSession";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST request handler for deleting a client session.
 *
 * @param req - The incoming NextRequest object.
 * @returns A NextResponse object with appropriate status and JSON data.
 */
export async function POST(req: NextRequest) {
    const res = NextResponse;
    // Extract the cookie from the request body
    const { cookie } = await req.json();
    // Determine the IP address based on the environment
    const ip = process.env.NODE_ENV === "development"? "localhost" : req.headers.get("x-forwarded-for");

    try {
        if (cookie) {
            // Call the deleteClientSession function with the session details
            const { user } = await deleteClientSession({ session: { ip: ip!, sessionId: cookie } });

            if (!user.error) {
                // Return a successful response with the user data
                return res.json(user, { status: 200, statusText: "OK" });
            } else {
                // Return a 400 response with an error message
                return res.json(user, { status: 400, statusText: "Session not found" });
            }
        } else {
            // Return a 400 response with an error message
            return res.json(
                { user: { error: true, message: "Invalid request" } },
                { status: 400, statusText: "Bad Request" }
            );
        }
    } catch (error) {
        // Log the error and return a 500 response with an error message
        console.error(error);
    }
    // Return a 500 response with an error message
    return res.json({ error: "Unable to delete session" }, { status: 500, statusText: "Internal Server Error" });
}
