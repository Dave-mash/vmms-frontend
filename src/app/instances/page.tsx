"use client";

import { useState } from "react";
import NoInstances from "./components/no-instances";

const Instances = () => {
  const [currentInstances, setCurrentInstances] = useState<any[]>();

  return (
    <div className="max-w-[100vw] mx-auto ml-[15%] min-h-[90vh] mt-[1rem] pt-[2rem]">
      {currentInstances?.length ?? <NoInstances />}
    </div>
  );
};

export default Instances;
