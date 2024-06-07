"use client";

import { signIn } from "@/src/app/actions/auth/sign-in";
import AuthSubmit from "@/src/app/auth/components/client/submitButton";
import Link from "next/link";
import PageCallback from "./PageCallback";

export default function Page() {
    return (
        <div className="flex flex-row justify-center items-center min-h-screen">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" action={signIn}>
                        <div>
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your name
                            </label>
                            <input
                                type="name"
                                name="name"
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="John"
                                required
                            />
                            <PageCallback />
                        </div>
                        <AuthSubmit id="logInButton" message="Log in" />
                        <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                            Don&apos;t have an account yet?{" "}
                            <Link
                                href="/auth/sign-up"
                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                            >
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
