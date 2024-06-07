import Loading from "@/src/app/actions/loading";
import { ReactNode, Suspense } from "react";
import SignUpReason from "./SignUpReason";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <Suspense fallback={<Loading />}>
            <SignUpReason>{children}</SignUpReason>
        </Suspense>
    );
}
