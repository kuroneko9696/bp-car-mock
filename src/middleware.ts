import { NextRequest, NextResponse } from "next/server";

const USER = "bp";
const PASS = "bp";
const COOKIE_NAME = "authed";

export function middleware(req: NextRequest) {
  if (req.cookies.get(COOKIE_NAME)) {
    return NextResponse.next();
  }

  const auth = req.headers.get("authorization");
  if (auth) {
    const [scheme, encoded] = auth.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = atob(encoded);
      const [user, pass] = decoded.split(":");
      if (user === USER && pass === PASS) {
        const res = NextResponse.next();
        res.cookies.set(COOKIE_NAME, "1", { path: "/", httpOnly: true });
        return res;
      }
    }
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
  });
}

export const config = {
  matcher: ["/"],
};
