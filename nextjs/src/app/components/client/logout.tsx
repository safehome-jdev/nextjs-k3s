import { Session } from "@/types/cookies";
import { cookies } from "next/headers";
import { ComponentProps, ReactNode } from "react";

interface LogoutProps extends ComponentProps<"form"> {
    user: Session;
}

interface LogoutFormProps extends LogoutProps {
    children: ReactNode;
}

export default function Logout({ user }: LogoutProps) {
    if (!user.sessionId) return <></>;

    const signOutAction = async () => {
        "use server";
        cookies().delete("sessionId");
    };

    return (
        <LogoutForm
            action={signOutAction}
            user={user}
            className="flex rounded-2xl border-2 border-gray-500 opacity-50 hover:opacity-90 hover:border-gray-300 active:scale-95 transition duration-75 min-w-max min-h-fit"
        >
            <LogoutIcon className="min-w-10 min-h-12 p-2" />
        </LogoutForm>
    );
}

export function LogoutForm({ user, children, ...props }: LogoutFormProps) {
    return (
        <form {...props}>
            <input type="hidden" name="sessionId" value={user.sessionId} />
            <button className="flex flex-row justify-center align-center">
                {children}
                <div className="p-4 self-center">Logout</div>
            </button>
        </form>
    );
}
export function LogoutIcon({ ...props }: ComponentProps<"svg">) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M10 12h10m0 0l-3-3m3 3l-3 3"
            ></path>
            <path
                stroke="#fff"
                strokeLinecap="round"
                strokeWidth="1.5"
                d="M4 12a8 8 0 018-8m0 16a7.985 7.985 0 01-6.245-3"
            ></path>
        </svg>
    );
}
