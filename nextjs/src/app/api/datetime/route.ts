import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const res = NextResponse;

  return res.json({ timestamp: new Date() });
}
