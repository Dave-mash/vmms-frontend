export { default } from "next-auth/middleware"

// applies next-auth only to matching routes
export const config = { matcher: ["/dashboard"] };
export const NEXT_PUBLIC_VMMS_BACKEND_URL = `${process.env.NEXT_PUBLIC_VMMS_BACKEND_URL}/api/v1`