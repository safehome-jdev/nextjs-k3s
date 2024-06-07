import Loading from "@/src/app/actions/loading";
import getClientSession from "@/src/app/actions/mongodb/getClientSession";
import { Login } from "@/src/app/auth/login/redirect";
import { ReactNode, Suspense } from "react";
import { getCurrentUser } from "../actions/auth/session/getCurrentUser";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: ReactNode }) {
    const session = await getCurrentUser();
    if (!session.name) {
        redirect("/auth/login");
        // return <Login callbackURL="/clicker" />;
    }

    if (session.sessionId) {
        const { user } = await getClientSession({ session: { ip: session.ip, sessionId: session.sessionId } });
        if (user.message === "Session not found" || user.message === "Session expired") {
            return <Login />;
        }
    }

    return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
