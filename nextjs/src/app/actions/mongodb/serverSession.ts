import { DATABASE } from "@/lib/constants";
import MongoSession from "@/lib/mongodb";
import { MongoClient } from "mongodb";

/**
 * This function establishes a server-side session with MongoDB and returns the MongoClient instance.
 * It also checks if the "users" collection exists in the specified database. If not, it creates the collection.
 *
 * @returns {Promise<MongoClient>} A Promise that resolves to the MongoClient instance.
 *
 * @throws Will throw an error if there is a problem connecting to the MongoDB server or creating the collection.
 *
 * @example
 * ```typescript
 * const mongoClient = await serverSession();
 * // Use mongoClient for further database operations
 * ```
 */

export async function serverSession(): Promise<MongoClient> {
    const session = await MongoSession; // Assuming MongoSession is a Promise that resolves to a MongoClient instance
    const database = session.db(DATABASE);

    // Ping the MongoDB server to check the connection
    const ping = await database.command({ ping: 1 });

    if (ping) {
        console.log({ ping });
    }

    // Check if the "users" collection exists
    if (!database.collection("users")) {
        // If the "users" collection does not exist, create it
        database.createCollection("users");
    }

    try {
        return session;
    } catch (error) {
        console.error(error);
        await session.close();
        throw error;
    }
}
