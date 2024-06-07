import { SERVER_URL } from "@/lib/constants";
import { Session } from "@/types/cookies";
import getSessionId from "./getCurrentSessionId";

/**
 * This function retrieves the current user's information from the server.
 * It uses the sessionId cookie to authenticate the request.
 *
 * @returns {Promise<object>} - A promise that resolves to the user's information if the request is successful,
 * or an empty object if the cookie is not present.
 *
 * @throws null - If the request to the server fails.
 */

export async function getCurrentUser(): Promise<Session> {
    const cookie = await getSessionId();

    let user: Session = { name: "", sessionId: "", ip: "" };
    // If the cookie is present, make a request to the server
    if (cookie) {
        const request = await fetch(`${SERVER_URL}/api/auth/whoami`, {
            body: JSON.stringify({ cookie }),
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });

        // If the request is successful, parse the response as JSON and return the data
        const data = await request.json();

        user = {
            ...data,
        };

        if (!request.ok) {
            // We should delete the cookie if the request fails
        }

        return user;
    }

    // If the cookie is not present, return an empty object
    return user;
}
