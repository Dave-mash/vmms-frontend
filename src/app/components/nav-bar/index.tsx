"use client";

import { IoMenu } from "react-icons/io5";
import { MdOutlineTerminal } from "react-icons/md";
import { TiArrowSortedDown, TiThMenu } from "react-icons/ti";
import ProfileDropDown from "./components/profile-drop-down";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCookie } from "@/app/utils";
import CustomInput from "../custom-input";
import { FaBell, FaGear } from "react-icons/fa6";

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [display, setDisplay] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [showDropDown, setShowDropDown] = useState(false);

  const handleToggleDropDown = () => {
    setShowDropDown((prev) => !prev);
  };

  const handleGetUserProfile = useCallback(async () => {
    try {
      console.log("THIS THE TOKEN: ");
      const baseUrl = process.env.NEXT_PUBLIC_VMMS_BACKEND_URL;
      const accessToken = getCookie("vmms:session");
      if (!accessToken) {
        router.replace("/login");
      }

      const response = await fetch(`${baseUrl}/auth`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        pathname !== "/register" && router.replace("/login");
        throw new Error("Failed to send user data to backend");
      }

      const result = await response.json();
      setUserProfile(result);

      console.log("Successfully fetched data from backend:", result);
    } catch (error) {
      console.error("::::::::::::::::::::::>", error);
    }
  }, []);

  const handleDisplay = useCallback(() => {
    const pathnames = ["/login", "/register"];
    if (pathname !== "/login" && pathname !== "/register") {
      setDisplay(true);
    }
  }, []);

  useEffect(() => {
    handleDisplay();
    handleGetUserProfile();
    // console.log("router:::::::::::::::::: ", window.location);
  }, [handleDisplay, handleGetUserProfile]);

  return (
    <>
      {pathname !== "/login" && pathname !== "/register" && (
        <div className="flex py-5 px-[2rem] w-[90%] bg-[#3D454F] text-[#D9D9D9] justify-between h-[5vh]">
          <div className="flex flex-[60%] items-center text-[2rem] hover:text-[#fff]">
            <IoMenu
              className="cursor-pointer text-2xl"
            />
          </div>
          <div className="flex flex-[40%] justify-between items-center">
            <div className="flex items-center justify-between text-1xl">
              <FaBell className="mr-[1rem] cursor-pointer hover:text-[#fff]" />
              <FaGear className="mr-[1rem] cursor-pointer hover:text-[#fff]" />
              <MdOutlineTerminal className="mr-[1rem] cursor-pointer hover:text-[#fff]" />
            </div>
            <div className="py-[1rem]">
              <CustomInput
                label=""
                id="search"
                name="search"
                type="text"
                placeholder="Type anything..."
                value={() => {}}
                onChange={() => {}}
                onBlur={() => {}}
              />
            </div>
            <div
              className="flex items-center cursor-pointer hover:text-[#fff]"
              onClick={handleToggleDropDown}
            >
              <p className="mr-[.5rem]">{userProfile?.full_name}</p>
              <TiArrowSortedDown />
              {showDropDown && <ProfileDropDown />}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
