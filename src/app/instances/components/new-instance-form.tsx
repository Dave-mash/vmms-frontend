"use client";

import CustomInput from "@/app/components/custom-input";
import { useFormik } from "formik";
import { FaUbuntu } from "react-icons/fa6";
import * as yup from "yup";

const NewInstanceForm = () => {
  const validationSchema = yup.object({
    name: yup.string().required("Instance name is required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      email: "",
      currency: "",
      terms: false,
    },

    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form className="min-w-[100%]">
      <div className="bg-[#fff] max-w-[80%] p-[1rem] rounded-sm mb-[1rem]">
        <CustomInput
          label="Instance Name"
          id="name"
          name="name"
          type="text"
          placeholder="e.g My Server"
        />
      </div>
      <div className="flex flex-col max-w-[80%] py-[1rem] rounded-sm text-[#3D454F] mb-[1rem]">
        <label
          htmlFor="name"
          className="block text-sm font-bold leading-6 mb-[.5rem]"
        >
          OS Images
        </label>
        <div className="flex">
          <div className="flex flex-col w-[5rem] bg-[#fff] h-[6rem] border-2 border-black mr-[1rem] rounded-sm">
            <p className="text-[.8rem] text-center mt-[.5rem]">Ubuntu</p>
            <div className="mt-[40%] flex justify-center">
              <FaUbuntu color="#B14927" />
            </div>
          </div>
          <div className="w-[5rem] bg-[#fff] h-[6rem] border-2 mr-[1rem] rounded-sm">
            <p className="text-[.8rem] text-center mt-[.5rem]">Ubuntu</p>
            <div className="mt-[40%] flex justify-center">
              <FaUbuntu color="#B14927" />
            </div>
          </div>
          <div className="w-[5rem] bg-[#fff] h-[6rem] border-2 mr-[1rem] rounded-sm">
            <p className="text-[.8rem] text-center mt-[.5rem]">Ubuntu</p>
            <div className="mt-[40%] flex justify-center">
              <FaUbuntu color="#B14927" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#fff] max-w-[80%] p-[1rem] rounded-sm mb-[1rem]">
        <CustomInput
          label="Configure Storage"
          id="name"
          name="name"
          type="select"
          placeholder="e.g My Server"
          options={['one', 'two']}
        />
      </div>
    </form>
  );
};

export default NewInstanceForm;
