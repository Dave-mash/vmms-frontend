"use client";

// import Image from "next/image";
// import googleLogo from "@/public/google.png";
// import githubLogo from "@/public/github.png";
import {
  // CredentialsSignInButton,
  GithubSignInButton,
} from "@/app/components/authButtons";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
import { CredentialsForm } from "@/app/components/credentialsForm";
import { authOptions } from "@/app/lib/auth";
import { useRouter } from "next/navigation";
import RegisterUserForm from "../components/registerUserForm";
import Link from "next/link";
// import { getCsrfToken } from "next-auth/react"; route.ts

export default function RegisterPage() {
  const baseUrl = process.env.NEXT_PUBLIC_VMMS_BACKEND_URL;
  const router = useRouter();

  const handleGuestLogin = () => {
    fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer Guest`,
        "auth-type": "guest",
      },
      body: JSON.stringify({}),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        const sessionPayload = JSON.stringify(data?.access_token);
        // cookies.set("vmms:session", sessionPayload);
        document.cookie = `vmms:session=${sessionPayload}; path=/; max-age=3600`; // 1 hour expiration
        // document.cookie = "myCookie=myValue; path=/; max-age=3600";
        router.replace("/dashboard");
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-2">
      <h1 className="my-[2rem] text-4xl font-bold">Create Account</h1>
      <div className="flex min-w-[80vw] flex-col">
        <RegisterUserForm />
        <div className="max-w-[50%] mx-auto flex-[50%] flex flex-col justify-center w-[34vw]">
          <span className="text-2xl font-semibold text-white text-center mx-auto flex justify-center">
            Or
          </span>
          <div className="">
            <GithubSignInButton />
          </div>
          <button
            className="font-bold bg-[#fff] text-[#000] mt-[1rem] text-[1.3rem] rounded-lg py-[.5rem] px-[4rem] border-2 border-[#000]"
            onClick={handleGuestLogin}
          >
            Continue as guest
          </button>
        </div>
        <p className="my-[1rem] font-bold text-white text-[.9rem] text-center">
          Already have an account?{" "}
          <Link href={"/login"} className="text-[dodgerblue]">
            Go here
          </Link>
        </p>
      </div>
    </div>
  );
}
