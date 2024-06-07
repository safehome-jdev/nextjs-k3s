import { DATABASE } from "@/lib/constants";
import { randomString } from "@/lib/randomString";
import { serverSession } from "./serverSession";

/**
 * Creates a new user in the database.
 *
 * @param {Object} params - The parameters for creating a user.
 * @param {string} params.name - The name of the user.
 * @param {string} params.ip - The IP address of the user.
 *
 * @returns {Promise<{ user: { id: string; name: string } }>} - A promise that resolves to the created user object.
 * @throws {Error} - If the user cannot be created.
 */

export default async function createUser({
    name,
    session,
}: {
    name: string;
    session: { sessionId: string; ip: string };
}): Promise<{ user: { id: string; name: string; session: { sessionId: string; ip: string } } }> {
    const userId = randomString(24);
    const _session = await serverSession();
    const database = _session.db(DATABASE);
    const collection = database.collection("users");
    const users = collection;

    const insertUser = await users.insertOne({
        userId,
        name,
        session,
        createdAt: new Date(),
    });

    if (insertUser.acknowledged) {
        return { user: { id: userId, name: name, session } };
    } else {
        throw new Error("Unable to create user");
    }
}
