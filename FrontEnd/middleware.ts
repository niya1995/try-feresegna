import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the user from the cookie or localStorage
  const user = request.cookies.get("feresegna_user")?.value

  // If there's no user, allow the request to continue
  if (!user) {
    return NextResponse.next()
  }

  try {
    // Parse the user
    const parsedUser = JSON.parse(user)
    const { role } = parsedUser

    // Get the path
    const path = request.nextUrl.pathname

    // If the user is on the homepage or auth page and has a role that should be redirected
    if ((path === "/" || path.startsWith("/auth")) && (role === "admin" || role === "operator" || role === "driver")) {
      // Redirect based on role
      if (role === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url))
      } else if (role === "operator") {
        return NextResponse.redirect(new URL("/operator/dashboard", request.url))
      } else if (role === "driver") {
        return NextResponse.redirect(new URL("/driver/dashboard", request.url))
      }
    }
  } catch (error) {
    console.error("Error parsing user in middleware:", error)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
