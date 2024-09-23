import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { getCookies } from 'next-client-cookies/server';

export const setCookie = (name: string, value: any, days: number) => {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
};


export const getCookie = (name: string) => {
  const value = `; ${decodeURIComponent(document.cookie)}`;
  const parts: any = value.split(`; ${name}=`);
  if (parts.length === 2) {
    let cookieValue = parts?.pop().split(';').shift();
    // Remove surrounding quotes if present
    return cookieValue.replace(/^"(.*)"$/, '$1');
  }
};

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account }: any) {
      const cookies = getCookies();
      console.log('HERE ARE THE COOKIES::::::::::::::::: ',cookies)
      if (account && user) {
        try {
          const { access_token } = account;
          const baseUrl = process.env.NEXT_PUBLIC_VMMS_BACKEND_URL;
          console.log("THIS IS FROM /route: ", access_token);

          const response = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${access_token}`,
              "auth-type": 'github'
            },
            body: JSON.stringify({}),
          });

          if (!response.ok) {
            throw new Error("Failed to send user data to backend");
          }

          const result = await response.json();
          const sessionPayload = JSON.stringify(result?.access_token);
          cookies.set('vmms:session', sessionPayload)
          console.log('COOKIES HAVE BEEN SET: |||||||||||||||||||||||||||||||||||||||')

          console.log("Successfully sent GitHub user data to backend:", result);
        } catch (error) {
          console.error("Error sending data to backend:", error);
        }
      }

      return true;
    },
    jwt: async ({ token, user, account }: any) => {
      if (account && account.access_token) {
        token.accessToken = account.access_token; // <-- adding the access_token here
      }
      return token;
    },
    async session({ session, token }: any) {
      // Pass access token to the client
      session.accessToken = token.accessToken;
      return session;
    },
    // @ts-ignore
    authorized({ auth, request: { nextUrl } }: any) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  }
}
