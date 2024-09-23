"use client";

import { MdDashboard, MdOutlinePayment } from "react-icons/md";
import { FaMicrochip } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SideBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    console.log("router:::::::::::::::::: ", pathname);
    if (pathname !== "/login" && pathname !== "/register") {
      setDisplay(true);
    }
  }, []);

  return (
    <>
      {(pathname !== '/login' && pathname !== '/register') && <div className="bg-[#2A2E33] text-[#D9D9D9] w-[13%] py-[1rem] border-t-2 h-[95vh] absolute">
        <ul className="flex flex-col w-[60%] mx-auto justify-start">
          <li
            className={`flex items-center my-[1rem] cursor-pointer hover:text-[#44B9D6] ${
              pathname === "/dashboard" && "text-[#44B9D6]"
            }`}
            onClick={() => router.push("/dashboard")}
          >
            <MdDashboard />
            <p className="ml-[1rem]">Dashboard</p>
          </li>
          <li
            className={`flex items-center my-[1rem] cursor-pointer hover:text-[#44B9D6] ${
              pathname.includes("instances") && "text-[#44B9D6]"
            }`}
            onClick={() => router.push("/instances")}
          >
            <FaMicrochip />
            <p className="ml-[1rem]">Instances</p>
          </li>
          <li
            className={`flex items-center my-[1rem] cursor-pointer hover:text-[#44B9D6] ${
              pathname === "/billing" && "text-[#44B9D6]"
            }`}
            onClick={() => router.push("/billing")}
          >
            <MdOutlinePayment />
            <p className="ml-[1rem]">Billing</p>
          </li>
        </ul>
      </div>}
    </>
  );
};

export default SideBar;
