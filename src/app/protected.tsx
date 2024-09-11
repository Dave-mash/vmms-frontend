import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { signOut } from "next-auth/react";
import styles from "../styles/Home.module.css";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { Session } from "next-auth";
import { authOptions } from "./lib/auth";

// Define the props type
interface ProtectedProps {
  user: {
    name: string;
  };
}

// Define the getServerSideProps type
export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ProtectedProps>> {
  const session: Session | null = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user as ProtectedProps["user"], // Type assertion for user
    },
  };
}

// The functional component
export default function Protected({ user }: ProtectedProps) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome <b>{user.name}</b>
        </h1>

        <p className={styles.description}>This is a protected route</p>
        <p>
          <button onClick={() => signOut()}>Sign out</button>
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
