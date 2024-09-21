import { FaGear } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";

const ProfileDropDown = () => {
  return (
    <ul className="absolute top-[5.5%] right-[10%] w-[10rem] rounded-sm text-center">
      <li className="flex items-center cursor-pointer justify-center border-b-2 bg-[#3D454F] text-[#D9D9D9] hover:text-[#fff] py-[.5rem]">
        <FaGear />
        <p className="ml-[.5rem]">Account</p>
      </li>
      <li className="flex items-center cursor-pointer justify-center bg-[#3D454F] text-[#D9D9D9] hover:text-[tomato] py-[.5rem]">
        <IoIosLogOut />
        <p className="ml-[.5rem]">Logout</p>
      </li>
    </ul>
  );
};

export default ProfileDropDown;
