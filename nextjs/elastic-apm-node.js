module.exports = {
    serverUrl: process.env.ELASTIC_APM_SERVER_URL,
    serviceName: process.env.ELASTIC_APM_SERVICE_NAME,
    serverToken: process.env.ELASTIC_APM_SECRET_TOKEN,
    active: process.env.NODE_ENV === "production",
};