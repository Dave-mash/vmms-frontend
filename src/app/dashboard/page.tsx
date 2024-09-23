"use client";

import { Theme } from "@radix-ui/themes";
import CustomAlert from "../components/custom-alert";
import "@radix-ui/themes/styles.css";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();
  // Access the GitHub access token
  // console.log('::::::::::::::::: ', session, session?.accessToken);

  return (
    <div className="bg-[#D9D9D9] min-h-[95vh] min-w-[100vh]">
      <div className="w-[80%] ml-[15%] bg-[#D9D9D9]">
        <CustomAlert type="success" content="Hello Admin" time={5000} />
      </div>
    </div>
  );
};

export default Dashboard;
