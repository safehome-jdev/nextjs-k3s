export type Reason = {
    user: {
        error: boolean;
        message: string;
        name: string;
        session: {
            ip: string;
            sessionId: string;
        };
    };
};
