"use client";

import { useState } from "react";
import NoInstances from "./components/no-instances";

const Instances = () => {
  const [currentInstances, setCurrentInstances] = useState<any[]>();

  return (
    <div className="bg-[#D9D9D9] min-h-[95vh] min-w-[100vh]">
      <div className="bg-[#D9D9D9] max-w-[100vw] mx-auto ml-[10%] pt-[2rem]">
        {currentInstances?.length ?? <NoInstances />}
      </div>
    </div>
  );
};

export default Instances;
