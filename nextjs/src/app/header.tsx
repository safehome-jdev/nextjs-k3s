import { Session } from "@/types/cookies";
import { ReactNode } from "react";

export default async function Header({ user, children }: { user: Session; children?: ReactNode }) {
    const UserWelcome = () => {
        if (!user.name) return <></>;
        return (
            <div>
                Welcome <b className="px-[1px]">{user.name}!</b>
            </div>
        );
    };

    return (
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
            <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                <UserWelcome /> <p className="pl-1">Select an endpoint to view:</p>
            </div>
            {children}
        </div>
    );
}
