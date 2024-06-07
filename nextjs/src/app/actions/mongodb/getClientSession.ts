import { DATABASE, DEFAULT_REASON } from "@/lib/constants";
import { Reason } from "@/types/login";
import { serverSession } from "./serverSession";

/**
 * This function retrieves a user session from the MongoDB database based on the provided session details.
 *
 * @param session - An object containing the sessionId and ip of the user session.
 * @returns A Promise that resolves to a Reason object containing the user details and session information.
 *          If the session is found, the Reason object will have the user details and a success message.
 *          If the session is not found, the Reason object will have an error flag set to true and an error message.
 * @throws Will throw an error if there is an issue with the database connection or query execution.
 */

export default async function getClientSession({
    session,
}: {
    session: {
        sessionId: string;
        ip: string;
    };
}): Promise<Reason> {
    const { sessionId, ip } = session;
    const client = await serverSession();
    const database = client.db(DATABASE);
    const users = database.collection("users");

    const doc = await users.findOne(
        { $and: [{ "session.sessionId": { $eq: sessionId } }, { "session.ip": { $eq: ip } }] },
        { projection: { _id: 0 } }
    );
    let reason = DEFAULT_REASON;

    try {
        if (!doc) {
            return {
                user: {
                    ...reason.user,
                    error: true,
                    message: "Session not found",
                },
            };
        }

        return {
            user: {
                error: false,
                message: "Session found",
                name: doc.name,
                session: {
                    ip: doc.session.ip,
                    sessionId: doc.session.sessionId,
                },
            },
        };
    } catch (error) {
        console.error({ error });
        throw error;
    }
}
