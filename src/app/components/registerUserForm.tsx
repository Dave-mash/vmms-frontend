"use client";

import { FaUbuntu, FaWindows } from "react-icons/fa6";
import { FcDebian } from "react-icons/fc";
import { useFormik } from "formik";
import * as yup from "yup";

import CustomInput from "@/app/components/custom-input";
import { CustomBtn } from "@/app/components/custom-btn";
import { useState } from "react";
import { useRouter } from "next/dist/client/components/navigation";
import { getCookie } from "@/app/utils";

const RegisterUserForm = () => {
  const router = useRouter();
  const validationSchema = yup.object({
    name: yup.string().required("Instance name is required"),
    storage: yup.string().required("Instance name is required"),
  });
  const handleCreateNewInstance = async (body: any) => {
    // const accessToken = getCookie("vmms:session");
    // const response = await fetch(`${baseUrl}/vm/instance/create/`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    //   body,
    // });
    // if (!response.ok) {
    //   throw new Error("Failed to send user data to backend");
    // }
    // const result = await response.json();
    // console.log("::::::::::::: ", result);
  };

  const handleRegisterUser = () => {};

  const formik = useFormik({
    initialValues: {
      name: "",
      storage: "16GB - SSD",
    },
    // validationSchema,
    onSubmit: (values: any) => {
      console.log("HERE WE GO...", values);
      // handleCreateNewInstance(JSON.stringify(payload));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex mx-auto">
      <div className="flex justify-between text-[#3D454F] mx-auto">
        <div className="flex flex-col min-w-[30vw]">
          <div className="flex justify-between">
            <div className="bg-[#fff] p-[1rem] rounded-sm mb-[1rem] mx-auto w-full mr-[1rem]">
              <CustomInput
                label="Full Name"
                id="full_name"
                name="full_name"
                type="text"
                placeholder="e.g John Doe"
                value={formik.values.full_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="bg-[#fff] p-[1rem] rounded-sm mb-[1rem] mx-auto w-full">
              <CustomInput
                label="Username"
                id="username"
                name="username"
                type="text"
                placeholder="e.g Doe"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className="bg-[#fff] p-[1rem] rounded-sm mb-[1rem] mx-auto w-full mr-[1rem]">
            <CustomInput
              label="Phone"
              id="phone"
              name="phone"
              type="text"
              placeholder="e.g 07..."
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="bg-[#fff] p-[1rem] rounded-sm mb-[1rem] mx-auto w-full mr-[1rem]">
            <CustomInput
              label="Email"
              id="email"
              name="email"
              type="text"
              placeholder="e.g doe@email.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="flex justify-between">
            <div className="bg-[#fff] p-[1rem] rounded-sm mx-auto w-full mr-[1rem]">
              <CustomInput
                label="Password"
                id="password"
                name="password"
                type="text"
                placeholder="e.g 07..."
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="bg-[#fff] p-[1rem] rounded-sm mx-auto w-full">
              <CustomInput
                label="Confirm Password"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <CustomBtn
            content="Register"
            onClick={handleRegisterUser}
            btnType="primary"
            color="dodgerblue"
            styles={["bg-[#44B9D6]", "opacity-[.9]", "hover:opacity-[1], my-[1rem] w-full"]}
            icon={null}
          />
        </div>
      </div>
    </form>
  );
};

export default RegisterUserForm;
