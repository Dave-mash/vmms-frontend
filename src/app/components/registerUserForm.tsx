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
import CustomAlert from "./custom-alert";

const baseUrl = process.env.NEXT_PUBLIC_VMMS_BACKEND_URL;
const RegisterUserForm = () => {
  const [resMSG, setResMSG] = useState<string | null>(null);
  const router = useRouter();
  const validationSchema = yup.object({
    name: yup.string().required("Instance name is required"),
    storage: yup.string().required("Instance name is required"),
  });

  const handleRegisterUser = (data: any) => {
    fetch(`${baseUrl}/auth/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-type": "form",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(':::::: ', data);
        // const sessionPayload = JSON.stringify(data?.access_token);
        // document.cookie = `vmms:session=${sessionPayload}; path=/; max-age=3600`; // 1 hour expiration
        router.replace("/login");
      })
      .catch((error) => {
        const errorMSG = error?.statusText ?? '';
        setResMSG(errorMSG);
        console.error("Error:", error);
      });
  };

  const formik = useFormik({
    initialValues: {
      full_name: "",
      username: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    // validationSchema,
    onSubmit: (values: any) => {
      const { password, confirmPassword, username, full_name, phone } = values;
      if (password !== confirmPassword) {
        return setResMSG("Passwords don't match");;
      }

      const payload = {
        username,
        full_name,
        password,
        phone,
      };
      handleRegisterUser(payload);
      console.log("HERE WE GO...", values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex mx-auto flex-col">
      {resMSG && <CustomAlert type="error" content={resMSG} time={5000} />}
      <div className="flex justify-between text-[#3D454F] mx-auto mt-[1rem]">
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
                type="password"
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
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <CustomBtn
            content="Register"
            btnType="primary"
            color="dodgerblue"
            styles={[
              "bg-[#44B9D6]",
              "opacity-[.9]",
              "hover:opacity-[1], my-[1rem] w-full",
            ]}
            icon={null}
          />
        </div>
      </div>
    </form>
  );
};

export default RegisterUserForm;
