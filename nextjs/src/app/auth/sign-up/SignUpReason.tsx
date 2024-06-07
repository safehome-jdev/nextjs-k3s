"use client";

import decodeBase64 from "@/lib/decodeBase64";
import { Reason } from "@/types/login";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

export default function SignUpReason({ children }: { children: ReactNode }) {
    const searchParams = useSearchParams();
    const param = searchParams.get("reason");
    const reason: Reason | null = param ? decodeBase64(param) : null;

    if (reason) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen min-w-screen">
                <div className="flex flex-col text-white min-w-full text-center content-center bg-rose-600 py-4 min-h-fit max-h-26">
                    <div>User: {reason.user.name}</div>
                    <div>Error: {reason.user.message}!</div>
                    <div>Please create an account first!</div>
                </div>
                {children}
            </div>
        );
    } else {
        return <>{children}</>;
    }
}
