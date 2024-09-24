"use client";

import { FaUbuntu, FaWindows } from "react-icons/fa6";
import { FcDebian } from "react-icons/fc";
import { useFormik } from "formik";
import * as yup from "yup";

import CustomInput from "@/app/components/custom-input";
import { CustomBtn } from "@/app/components/custom-btn";
import { useState } from "react";
import { useRouter } from "next/dist/client/components/navigation";
import { getCookie, setCookie } from "@/app/utils";
import Link from "next/link";
import CustomAlert from "./custom-alert";
import { NEXT_PUBLIC_VMMS_BACKEND_URL } from "@/middleware";

const baseUrl = NEXT_PUBLIC_VMMS_BACKEND_URL;
const LoginForm = () => {
  const [resMSG, setResMSG] = useState<string | null>(null);
  const router = useRouter();
  const validationSchema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });
  const handleUserLogin = async (body: any) => {
    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-type": "form",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw response;
      }

      const result = await response.json();
      const sessionPayload = JSON.stringify(result?.access_token);

      setCookie("vmms:session", sessionPayload, 1);

      router.replace("/instances");
    } catch (error: any) {
      const errorMSG = error?.statusText ?? '';
      setResMSG(errorMSG);
      console.error("Error sending data to backend:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    // validationSchema,
    onSubmit: (values: any) => {
      console.log("HERE WE GO...", values);
      handleUserLogin(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex mx-auto flex-col">
      {resMSG && <CustomAlert type="error" content={resMSG} time={5000} />}
      <div className="flex justify-between text-[#3D454F] mx-auto flex-col mt-[1rem]">
        <div className="flex flex-col min-w-[30vw]">
          <div className="flex justify-between">
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
          <div className="flex justify-between">
            <div className="bg-[#fff] p-[1rem] rounded-sm mx-auto w-full">
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
          </div>
          <CustomBtn
            content="Login"
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

export default LoginForm;
