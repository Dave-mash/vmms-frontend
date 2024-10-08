import "./globals.css";
// import { Inter } from "next/font/google";
import Provider from "./providers";
import { Theme } from "@radix-ui/themes";
// import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import SideBar from "./components/side-bar";
import NavBar from "./components/nav-bar";
// import { getServerSession } from "next-auth";
import { getServerSession } from "next-auth";
import { useEffect } from "react";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // if (!session) redirect("/login");

  return (
    <html lang="en">
      <body className="">
        <Provider>
          <Theme>
            <div className="bg-[#3D454F] min-h-[100vh]">
              <NavBar />
              <SideBar />
              {children}
            </div>
          </Theme>
        </Provider>
      </body>
    </html>
  );
}
