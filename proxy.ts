import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

export function proxy(request: NextRequest) {
  // Only rate-limit POST requests to auth endpoints
  if (request.method !== "POST") return NextResponse.next();

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const { success } = rateLimit(`auth:${ip}`, 5, 15 * 60 * 1000);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/auth/callback/nodemailer",
    "/api/auth/signin/nodemailer",
  ],
};
