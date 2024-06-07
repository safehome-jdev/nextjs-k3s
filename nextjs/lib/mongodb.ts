import { MongoClient, MongoClientOptions } from "mongodb";
import { MONGODB_HOSTNAME, MONGODB_PASSWORD, MONGODB_PORT, MONGODB_USERNAME } from "./constants";

const options: MongoClientOptions = {
    authSource: "admin",
    connectTimeoutMS: 10000,
    maxConnecting: 10,
    maxIdleTimeMS: 3000,
    retryReads: true,
    retryWrites: true,
    wtimeoutMS: 10000,
};
const uri = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOSTNAME}:${MONGODB_PORT}`;

var client;
var MongoSession: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    let globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
        client = new MongoClient(uri, options);
        globalWithMongo._mongoClientPromise = client.connect();
    }
    MongoSession = globalWithMongo._mongoClientPromise;
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    MongoSession = client.connect();
}

// client?.on("commandStarted", (started) => console.log({ started }));

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default MongoSession;
