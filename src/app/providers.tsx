"use client";

import { Session } from "inspector";
import { getServerSession } from "next-auth";
import {
  getSession,
  SessionProvider as NextSessionProvider,
} from "next-auth/react";
import { redirect, usePathname } from "next/dist/client/components/navigation";
import { useCallback, useEffect, useState } from "react";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default function Provider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const [session, setSession] = useState<Session | null | undefined>(null);
  const pathName = usePathname();

  const fetchSession = useCallback(async () => {
    try {
      const sessionData: any = await getServerSession(authOptions);
      setSession(sessionData);
    } catch (error) {
      setSession(null);

      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }
    }
  }, []);

  useEffect(() => {
    fetchSession().finally();
  }, [fetchSession, pathName]);

  // @ts-ignore
  if (session) {
    redirect("/dashboard");
  } else {
    return (
      <NextSessionProvider session={session}>{children}</NextSessionProvider>
    );
  }
}
