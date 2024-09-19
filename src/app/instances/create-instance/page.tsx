"use client";

import NewInstanceForm from "../components/new-instance-form";

const CreateInstance = () => {
  return (
    <div className="bg-[#D9D9D9] min-h-[95vh] min-w-[100vh]">
      <div className="flex justify-between text-[#3D454F] max-w-[50vw] mx-auto ml-[15%] min-h-[90vh] pt-[2rem]">
        <NewInstanceForm />
      </div>
    </div>
  );
};

export default CreateInstance;
