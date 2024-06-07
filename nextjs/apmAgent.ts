import { init as initApm } from "@elastic/apm-rum";
import { ELASTIC_RUM_SERVER_URL, ELASTIC_RUM_SERVICE_NAME, ELASTIC_RUM_SERVICE_VERSION } from "./lib/constants";

export const RUMAgent = () =>
    initApm({
        serviceName: ELASTIC_RUM_SERVICE_NAME,
        serverUrl: ELASTIC_RUM_SERVER_URL,
        serviceVersion: ELASTIC_RUM_SERVICE_VERSION,
    });
