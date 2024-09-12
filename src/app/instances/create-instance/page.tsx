"use client";

import NewInstanceForm from "../components/new-instance-form";

const CreateInstance = () => {

  return (
    <div className="flex justify-between text-[#3D454F] max-w-[50vw] mx-auto ml-[15%] min-h-[90vh] mt-[1rem] pt-[2rem]">
      <NewInstanceForm />
    </div>
  );
};

export default CreateInstance;
