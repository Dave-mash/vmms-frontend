'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { GoArrowUpRight } from "react-icons/go";

import { CustomBtn } from "@/app/components/custom-btn";

const NoInstances = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center min-h-[90vh] justify-center pb-[10rem]">
      <div className="mb-[2rem]">
        <Image
          src="/cloud_servers.png"
          width={200}
          height={200}
          alt="Picture of the author"
        />
      </div>
      <p className="text-lg text-[#2A2E33]">Nothing here at the moment</p>
      <div className="flex mt-[2rem]">
        <CustomBtn
          content="Create Instance"
          onClick={() => router.push("/instances/create-instance")}
          btnType='primary'
          color=''
          styles={["bg-[#44B9D6]", "opacity-[.8]", "hover:opacity-[1]"]}
          icon={null}
        />
        <div className="w-[1rem]"></div>
        <CustomBtn
          content="View Documentation"
          onClick={() => router.push("/404")}
          btnType='primary-2'
          color='#44B9D6'
          icon={<GoArrowUpRight />}
        />
      </div>
    </div>
  );
};

export default NoInstances;
