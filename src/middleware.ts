export { default } from "next-auth/middleware"

// applies next-auth only to matching routes
export const config = { matcher: ["/dashboard"] };
export const NEXT_PUBLIC_VMMS_BACKEND_URL = process.env.NODE_ENV === 'production' ? `http://102.209.68.72:32391/api/v1` : 'http://localhost:3000/api/v1'
console.log('NEXT_PUBLIC_VMMS_BACKEND_URL:', NEXT_PUBLIC_VMMS_BACKEND_URL)