"use client";

import CustomInput from "@/app/components/custom-input";
import { CustomBtn } from "@/app/components/custom-btn";
import { useRouter } from "next/navigation";
import NewInstanceForm from "../components/new-instance-form";

const CreateInstance = () => {
  const router = useRouter();
  
  return (
    <div className="flex justify-between text-[#3D454F] max-w-[50vw] mx-auto ml-[15%] min-h-[90vh] mt-[1rem] pt-[2rem]">
      <div className="flex flex-col flex-[60%]">
        <h1 className="text-[2rem] mb-2">New Instance</h1>
        <div>
          <NewInstanceForm />
        </div>
      </div>
      <div className="flex flex-col items-start flex-[40%]">
        <h1 className="text-[2rem] mb-2">Summary</h1>
        <div className="flex flex-col">
          <CustomInput
            label="Number of instances"
            id="name"
            name="name"
            type="text"
            value="2"
            readonly
          />
          <p className="flex text-sm font-bold text-center mt-[1rem]">
            Software Image
          </p>
          <ul className="list-disc pl-[1rem]">
            <li className="text-[#0785A4]">Canonical, Ubuntu, 24.04</li>
          </ul>
          <p className="flex text-sm font-bold text-center mt-[1rem]">
            Storage
          </p>
          <ul className="list-disc pl-[1rem]">
            <li className="text-[#0785A4]">16GB - SSD</li>
          </ul>
          <div className="flex mt-[1.5rem]">
            <CustomBtn
              content="Cancel"
              onClick={() => router.push('/dashboard')}
              btnType="primary-2"
              color=""
              icon={null}
            />
            <CustomBtn
              content="Create Instance"
              onClick={() => {}}
              btnType="primary"
              styles={["bg-[#156101]", "opacity-[.8]", "hover:opacity-[1]"]}
              icon={null}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInstance;
