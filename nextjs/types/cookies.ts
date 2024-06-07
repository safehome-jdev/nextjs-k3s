import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export type Message = {
    message: string;
    error: boolean;
    seen: boolean;
};

export type Session = {
    name: string;
    sessionId: string;
    ip: string;
};

export type Cookie = {
    cookie: RequestCookie;
};
