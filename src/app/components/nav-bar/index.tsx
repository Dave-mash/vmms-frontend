"use client"

import { HamburgerMenuIcon, BellIcon, GearIcon } from "@radix-ui/react-icons";
import { MdOutlineTerminal } from "react-icons/md";
import { TiArrowSortedDown } from "react-icons/ti";
import ProfileDropDown from "./components/profile-drop-down";
import { useState } from "react";

const NavBar = () => {
  const [showDropDown, setShowDropDown] = useState(false);

  const handleToggleDropDown = () => {
    setShowDropDown(prev => !prev)
  }

  return (
    <div className="flex py-5 px-[2rem] w-full bg-[#3D454F] text-[#D9D9D9] justify-between h-[5vh]">
      <div className="flex flex-[80%] items-center text-[2rem] hover:text-[#fff]">
        <HamburgerMenuIcon style={{ fontSize: "100px" }} className="cursor-pointer" />
      </div>
      <div className="flex flex-[20%] justify-between">
        <div className="flex items-center">
          <BellIcon className="text-6xl cursor-pointer hover:text-[#fff]" />
          <GearIcon className="cursor-pointer hover:text-[#fff]" />
          <MdOutlineTerminal className="cursor-pointer hover:text-[#fff]" />
        </div>
        <div className="flex items-center cursor-pointer hover:text-[#fff]" onClick={handleToggleDropDown}>
          <p className="mr-[.5rem]">Guest</p>
          <TiArrowSortedDown />
          {showDropDown && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
