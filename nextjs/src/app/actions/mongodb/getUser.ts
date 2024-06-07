import { DATABASE } from "@/lib/constants";
import { serverSession } from "./serverSession";

/**
 * Retrieves a user from the MongoDB database based on the provided name and IP address.
 *
 * @param {Object} params - The parameters for the function.
 * @param {string} params.name - The name of the user to retrieve.
 * @param {string} params.ip - The IP address of the user to retrieve.
 *
 * @returns {Promise<Object>} - A Promise that resolves to the user object if found,
 * or an object with an 'unauthorized' property if the user is not found.
 *
 * @throws {Error} - If an error occurs during the database operation.
 *
 * @example
 * const user = await getUser({ name: 'John Doe', ip: '192.168.0.1' });
 * console.log(user); // { _id: '123', name: 'John Doe', ip: '192.168.0.1' }
 */

export default async function getUser({
    name,
    ip,
}: {
    name: string;
    ip: string;
}): Promise<{ user: { name: string; ip: string; error: boolean; message: string } }> {
    const client = await serverSession();
    const database = client.db(DATABASE);
    const collection = database.collection("users");
    const users = collection;

    try {
        const user = await users.findOne(
            { $and: [{ name: { $eq: name } }, { "session.ip": { $eq: ip } }] },
            { projection: { _id: 0 } }
        );
        if (!user) {
            return {
                user: {
                    ip,
                    name,
                    error: true,
                    message: "User not found",
                },
            };
        }

        return {
            user: {
                ip,
                name,
                error: false,
                message: "User found",
            },
        };

    } catch (error) {
        console.error({ function: "/actions/mongodb/getUser", error });
        throw error;
    }
}
