"use server";

import { SERVER_URL } from "@/lib/constants";
import { redirect } from "next/navigation";

/**
 * Function to handle user sign out.
 *
 * @remarks
 * This function sends a POST request to the server to sign out the user.
 * It expects a FormData object containing the sessionId.
 * If the sessionId is valid, it redirects the user to the home page.
 * If the sessionId is invalid, it throws an error.
 *
 * @param formData - A FormData object containing the sessionId.
 * @throws Will throw an error if the sessionId is invalid.
 * @returns {Promise<void>} - A Promise that resolves when the sign out process is complete.
 */
export async function signOut(formData: FormData): Promise<void> {
    const sessionId = formData.get("sessionId");

    if (sessionId) {
        const response = await fetch(`${SERVER_URL}/api/auth/sign-out`, {
            body: JSON.stringify({ cookie: sessionId }),
            method: "POST",
        });

        const { user } = await response.json();

        if (user.error) {
            throw new Error(user.error);
        }

        redirect("/");
    }
}