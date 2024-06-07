"use client";

import Loading from "@/src/app/actions/loading";
import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

interface AuthSubmitProps extends ComponentProps<"button"> {
    message: string;
}
export default function AuthSubmit({ message, ...props }: AuthSubmitProps) {
    const { pending } = useFormStatus();

    return (
        <button
            {...props}
            type="submit"
            disabled={pending}
            className={
                "w-full text-white bg-blue-500 bg-opacity-70 hover:bg-opacity-100 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            }
        >
            {pending ? <Loading size={8} /> : message}
        </button>
    );
}
