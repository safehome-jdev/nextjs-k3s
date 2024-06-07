"use client";

import decodeBase64 from "@/lib/decodeBase64";
import { Reason } from "@/types/login";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";
export default function LoginReason({ children }: { children: ReactNode }) {
    const searchParams = useSearchParams();
    const param = searchParams.get("reason");
    const reason: Reason | null = param ? decodeBase64(param) : null;

    if (!reason) {
        return children;
    }
    
    const HandleReason = () => (reason.user.error ? <NoUserExists reason={reason} /> : <NewUser reason={reason} />);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen min-w-screen">
            <div
                className={`flex flex-col text-white min-w-full text-center content-center py-4 min-h-fit max-h-26 ${
                    reason.user.error ? "bg-red-600" : "bg-green-600"
                }`}
            >
                <HandleReason />
            </div>
            {children}
        </div>
    );
}

function NoUserExists({ reason }: { reason: Reason }) {
    return (
        <div>
            <div>
                {reason.user.name} {reason.user.message}!
            </div>
            <div>Please create an account first!</div>
        </div>
    );
}

function NewUser({ reason }: { reason: Reason }) {
    return (
        <div>
            Welcome <b>{reason.user.name}</b>, please log in!
        </div>
    );
}
