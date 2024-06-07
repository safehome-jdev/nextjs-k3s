import { ReactNode, Suspense } from "react";
import Loading from "../../actions/loading";
import LoginReason from "./LoginReason";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <Suspense fallback={<Loading />}>
            <LoginReason>{children}</LoginReason>
        </Suspense>
    );
}
