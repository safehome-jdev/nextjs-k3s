import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    var envs: {} = {};

    for (const key in process.env) {
        Object.assign(envs, { [key]: process.env[key] });
    }

    const result = Array.from(Object.entries(envs))
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([key, value]) => ({ [key]: value }));

    return NextResponse.json([...result]);
}
