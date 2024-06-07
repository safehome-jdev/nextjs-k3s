import { DATABASE } from "@/lib/constants";
import { generateSessionId } from "@/lib/createSessionId";
import { Reason } from "@/types/login";
import { User } from "@/types/user";
import { serverSession } from "./serverSession";

/**
 * Creates a new client session in the MongoDB database.
 *
 * @param user - The user object for which the session is being created.
 * @returns The ID of the newly created session.
 * @throws Will throw an error if the session creation fails.
 * @remarks This function uses the `serverSession` function to establish a connection to the MongoDB server.
 * It generates a unique session ID using the `generateSessionId` function.
 * The session data is then inserted into the "users" collection in the MongoDB database.
 * If the insertion is successful, the function returns the ID of the newly created session.
 * If the insertion fails, an error is thrown.
 * Finally, the MongoDB client connection is closed.
 */

export async function createClientSession({ user }: { user: User }): Promise<Reason> {
    const client = await serverSession();
    const database = client.db(DATABASE);
    const collection = database.collection("users");
    const users = collection;
    const sessionId = generateSessionId(); // Generate a unique session ID

    try {
        const newDoc = await users.findOneAndUpdate(
            {
                name: { $eq: user.name },
                "session.ip": { $eq: user.ip },
            },
            { $set: { "session.sessionId": sessionId, "session.ip": user.ip } }
        );

        if (newDoc) {
            return {
                user: {
                    error: false,
                    message: "Created new session successfully.",
                    name: newDoc.name,
                    session: {
                        sessionId,
                        ip: user.ip,
                    },
                },
            };
        } else {
            const reason = {
                user: {
                    error: true,
                    message: "Unable to create session. Please try again.",
                    name: user.name,
                    session: {
                        sessionId: "",
                        ip: user.ip,
                    },
                },
            };

            return reason;
        }
    } catch (error) {
        console.error({ error });
        throw error;
    }
}
