import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const res = NextResponse;

  return res.json({ status: "OK" }, { status: 200, statusText: "OK" });
}
