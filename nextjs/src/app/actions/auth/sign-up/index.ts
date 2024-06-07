"use server";

import { SERVER_URL } from "@/lib/constants";
import { redirect } from "next/navigation";

export async function signUp(formData: FormData) {
    const userFormData = {
        name: formData.get("name"),
    };

    const SIGNUP_URL = `${SERVER_URL}/api/auth/sign-up`;

    const response = await fetch(SIGNUP_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userFormData),
    });

    if (response.ok) {
        const data = await response.json();

        if (data.redirect) {
            redirect(data.redirect);
        } else {
            return data;
        }
    } else {
        console.log(response);
    }
}
