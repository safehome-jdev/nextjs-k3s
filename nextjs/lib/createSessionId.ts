import { randomString } from "./randomString";

export function generateSessionId() {
    return randomString(48);
}
