import { DATABASE, DEFAULT_REASON } from "@/lib/constants";
import { Reason } from "@/types/login";
import getClientSession from "./getClientSession";
import { serverSession } from "./serverSession";

/**
 * Deletes a client session from the database.
 *
 * @param sessionId - The unique identifier of the session to delete.
 * @returns A Promise that resolves to a Reason object indicating the success or failure of the operation.
 * @throws Will throw an error if the operation fails.
 */
export default async function deleteClientSession({
    session,
}: {
    session: { ip: string; sessionId: string };
}): Promise<Reason> {
    // Connect to the MongoDB server
    const client = await serverSession();
    const database = client.db(DATABASE);

    // Initialize the reason object
    let reason = DEFAULT_REASON;
    
    try {
        // Find the session in the database
        const findSession = await getClientSession({ session });
        if (findSession) {
            const collection = database.collection("users");
            const users = collection;
            // Delete the session from the database
            const deleteCurrentSession = await users.deleteOne({
                $and: [
                    { name: findSession.user.name },
                    { "session.sessionId": { $eq: findSession.user.session.sessionId } },
                ],
            });

            if (deleteCurrentSession.acknowledged) {
                // Return success message
                return {
                    user: {
                        ...reason.user,
                        error: false,
                        message: `Session ${findSession.user.session.sessionId} deleted`,
                    },
                };
            } else {
                // Throw an error if the session deletion was not acknowledged
                throw new Error("Unable to delete session");
            }
        } else {
            // Return error message if the session was not found
            return {
                user: {
                    ...reason.user,
                    error: true,
                    message: "Session not found",
                },
            };
        }
    } catch (error) {
        // Log the error and rethrow it
        console.error({ error });
        throw error;
    }
}
