"use server";

import { SERVER_URL } from "@/lib/constants";
import encodeToBase64 from "@/lib/encodeBase64";
import { createClientSession } from "@/src/app/actions/mongodb/createClientSession";
import { Session } from "@/types/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SIGNIN_URL = `${SERVER_URL}/api/auth/sign-in`;

/**
 * Function to handle user sign-in.
 *
 * @param formData - The form data containing user's name and callback URL.
 * @returns {Promise<void>} - A promise that resolves when the sign-in process is complete.
 */
export async function signIn(formData: FormData): Promise<void> {
    // Extract user's name and callback URL from the form data
    const userFormData = {
        name: formData.get("name"),
        callback: formData.get("callback"),
    };

    // Send a POST request to the sign-in API endpoint
    const response = await fetch(SIGNIN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userFormData),
    });

    // Parse the response as JSON and log the data
    const data: Session = await response.json();

    // If the response is not OK, redirect to the sign-up page with the reason encoded in the query parameter
    if (!response.ok) {
        redirect(`/auth/sign-up?reason=${encodeToBase64(data)}`);
    }

    // Create a client session using the user's IP and name
    const { user } = await createClientSession({ user: { ip: data.ip, name: data.name } });

    // If a user is returned, set the session ID cookie
    if (user) {
        cookies().set("sessionId", user.session.sessionId);
    }

    // If a callback URL is provided, redirect to it; otherwise, redirect to the home page
    if (userFormData.callback) {
        redirect(userFormData.callback.toString());
    } else {
        redirect("/");
    }
}