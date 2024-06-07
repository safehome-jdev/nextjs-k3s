import { cookies } from "next/headers";

export default async function getSessionId() {
    // Get the sessionId cookie from the request headers
    const cookieStore = cookies();
    const cookie = cookieStore.get("sessionId");

    return cookie;
}
