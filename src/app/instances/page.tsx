"use client";

import { useCallback, useEffect, useState } from "react";
import NoInstances from "./components/no-instances";
import CustomTable from "../components/custom-table/page";
import { getCookie } from "../utils";

const baseUrl = process.env.NEXT_PUBLIC_VMMS_BACKEND_URL;
const Instances = () => {
  const [currentInstances, setCurrentInstances] = useState<any[]>([]);

  const headings = [
    "Name",
    "ID",
    "Status",
    "Public IP",
    "Storage Type",
    "Storage Size",
    "Options",
  ];

  const handleGetInstances = useCallback(async () => {
    const accessToken = getCookie("vmms:session");
    const response = await fetch(`${baseUrl}/vm/instance/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // if (!response.ok) {
    //   throw new Error("Failed to send user data to backend");
    // }

    const result = await response.json();
    setCurrentInstances(result);

    console.log("::::::: ", result);
  }, [currentInstances]);

  useEffect(() => {
    handleGetInstances();
  }, []);

  return (
    <div className="bg-[#D9D9D9] min-h-[95vh] min-w-[100vh]">
      <div className="bg-[#D9D9D9] max-w-[100vw] mx-auto ml-[10%] pt-[2rem]">
        {!currentInstances?.length ? (
          <NoInstances />
        ) : (
          <div className="flex justify-center text-[#2A2E33]">
            <CustomTable headings={headings} rows={currentInstances} options={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Instances;
