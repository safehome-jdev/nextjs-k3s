"use client";

import { useSearchParams } from "next/navigation";

export default function PageCallback() {
    const searchParams = useSearchParams();
    const callback = searchParams.get("callback");

    return (
        <input
            type="hidden"
            name="callback"
            id="callback"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={callback || ""}
        />
    );
}
