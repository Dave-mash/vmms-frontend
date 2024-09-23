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
import CustomAlert from "@/app/components/custom-alert";

const baseUrl = process.env.NEXT_PUBLIC_VMMS_BACKEND_URL;
const availableImages = [
  {
    name: "Ubuntu",
    value: "Canonical, Ubuntu, 24.04",
    Icon: FaUbuntu,
    active: true,
  },
  {
    name: "Windows",
    value: "Windows 11",
    Icon: FaWindows,
    active: false,
  },
  {
    name: "Debian",
    value: "Debian",
    Icon: FcDebian,
    active: false,
  },
];
const NewInstanceForm = () => {
  const [images, setActiveImage] = useState(availableImages);
  const [resMSG, setResMSG] = useState<any>(null);
  const router = useRouter();
  const validationSchema = yup.object({
    name: yup.string().required("Instance name is required"),
    storage: yup.string().required("Instance name is required"),
  });
  const handleCreateNewInstance = async (body: any) => {
    const accessToken = getCookie("vmms:session");
    const response = await fetch(`${baseUrl}/vm/instance/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body,
    })

    // if (!response.ok) {
    //   throw new Error("Failed to send user data to backend");
    // }

    const result = await response.json();
    if (result?.statusCode > 205) {
      console.log('ERRRRRRRRRROR: ', result)
      const { message } = result;
      setResMSG({
        type: "error",
        msg: message,
      });
    } else {
      setResMSG({
        type: "success",
        msg: "Instance created successfully.",
      });
  
      console.log("::::::::::::: ", result);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      storage: "16GB - SSD",
    },
    // validationSchema,
    onSubmit: (values: any) => {
      const activeImage = images.filter(({ active }) => active);
      const { storage, name } = values;
      const storage_type = values.storage.split("-")[1];
      const storage_size = values.storage.split("-")[0];
      const payload = {
        image_name: activeImage[0]?.name ?? "",
        storage_type,
        storage_size,
        name,
      };
      console.log("HERE WE GO...", payload);
      // alert(JSON.stringify(payload, null, 2));
      handleCreateNewInstance(JSON.stringify(payload));
    },
  });
  const handleSelectImage = ({ name, Icon, active, idx, value }: any) => {
    if (active === false) {
      const payload = { name, Icon, active: true, value };
      images.splice(idx, 1);
      const updatedImageList = images?.map((image) => ({
        ...image,
        active: false,
      }));
      updatedImageList.splice(idx, 0, payload);
      setActiveImage(updatedImageList);
    } else {
      setActiveImage([]);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {resMSG?.msg && (
        <CustomAlert type={resMSG?.type} content={resMSG?.msg} time={5000} />
      )}
      <form onSubmit={formik.handleSubmit} className="min-w-[60vw] flex">
        <div className="flex justify-between text-[#3D454F] flex-[50%] mx-auto min-h-[90vh]">
          <div className="flex flex-col flex-[60%]">
            <h1 className="text-[1.5rem] mb-2">New Instance</h1>
            {/* formik={formik} */}
            <div className="bg-[#fff] max-w-[80%] p-[1rem] rounded-sm mb-[1rem]">
              <CustomInput
                label="Instance Name"
                id="name"
                name="name"
                type="text"
                placeholder="e.g My Server"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
                {images?.map(({ name, Icon, active, value }: any, idx) => (
                  <div
                    key={name}
                    className={`flex flex-col w-[5rem] bg-[#fff] h-[6rem] ${
                      active ? "border-2 border-black " : ""
                    } mr-[1rem] rounded-sm cursor-pointer`}
                    onClick={() =>
                      handleSelectImage({ name, Icon, active, idx, value })
                    }
                  >
                    <p className="text-[.8rem] text-center mt-[.5rem]">
                      {name}
                    </p>
                    <div className="mt-[40%] flex justify-center">
                      <Icon color="#B14927" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#fff] max-w-[80%] p-[1rem] rounded-sm mb-[1rem] text-[.7rem]">
              <CustomInput
                label="Configure Storage"
                id="name"
                name="storage"
                type="select"
                placeholder="e.g My Server"
                options={["16GB - SSD", "32GB - SSD"]}
                value={formik.values.storage}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start flex-[40%]">
          <h1 className="text-[1.5rem] mb-2">Summary</h1>
          <div className="flex flex-col">
            <CustomInput
              label="Number of instances"
              id="name"
              name="name"
              type="text"
              defaultValue="1"
              readOnly
            />
            <p className="flex text-sm font-bold text-center mt-[1rem]">
              Software Image
            </p>
            <ul className="list-disc pl-[1rem]">
              <li className="text-[#0785A4]">
                {`${formik.values.name}`}{" "}
                {images?.filter(({ active }) => active)[0]?.value}
              </li>
            </ul>
            <p className="flex text-sm font-bold text-center mt-[1rem]">
              Storage
            </p>
            <ul className="list-disc pl-[1rem]">
              <li className="text-[#0785A4]">{formik?.values.storage}</li>
            </ul>
            <div className="flex mt-[1.5rem]">
              <CustomBtn
                content="Cancel"
                onClick={() => router.push("/dashboard")}
                btnType="primary-2"
                color=""
                icon={null}
              />
              <button
                className={`bg-[#156101] cursor-pointer opacity-[.8] hover:opacity-[1] flex items-center py-[.8rem] rounded-sm w-[13rem] justify-center text-[#fff]`}
                type="submit"
              >
                Create Instance
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewInstanceForm;
