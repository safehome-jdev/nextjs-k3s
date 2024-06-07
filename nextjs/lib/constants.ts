import { Reason } from "@/types/login";

export const HOSTNAME = process.env.HOSTNAME;
export const PORT = process.env.PORT;
export const PROTOCOL = process.env.__NEXT_PRIVATE_ORIGIN?.split(":")[0];
export const SERVER_URL =
    process.env.NODE_ENV === "development" ? `${PROTOCOL}://${HOSTNAME}:${PORT}` : process.env.SERVER_URL;
export const DATABASE = process.env.MONGODB_DATABASE;
export const DEFAULT_REASON: Reason = {
    user: {
        error: false,
        message: "",
        name: "",
        session: {
            ip: "",
            sessionId: "",
        },
    },
};
export const MONGODB_HOSTNAME = process.env.MONGODB_HOSTNAME || "localhost";
export const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || "mongo_admin";
export const MONGODB_PORT = process.env.MONGODB_PORT || "27017";
export const MONGODB_USERNAME = process.env.MONGODB_USERNAME || "admin";
export const ELASTIC_RUM_SERVICE_NAME = process.env.ELASTIC_RUM_SERVICE_NAME;
export const ELASTIC_RUM_SERVER_URL = process.env.ELASTIC_RUM_ENVIRONMENT;
export const ELASTIC_RUM_SERVICE_VERSION = process.env.ELASTIC_RUM_SERVICE_VERSION;
