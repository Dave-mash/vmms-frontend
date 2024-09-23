import { Callout, Flex, Link } from "@radix-ui/themes";
import { IAlertType } from "./types";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useCallback, useEffect, useState } from "react";

export default function CustomAlert({
  type,
  content,
  time = 3000,
}: IAlertType) {
  const [bg, setBG] = useState("#132D23");
  const [show, setShow] = useState(true);

  const handleSetBG = useCallback(() => {
    switch (type) {
      case "error":
        setBG("bg-[#E71936]");
        break;
      case "success":
        setBG("bg-[#065F3C]");
        break;
    }
  }, [type]);

  useEffect(() => handleSetBG(), []);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, time);
  }, []);

  return (
    <>
      {show && <div className={`${bg} rounded-lg p-[.7rem] opacity-[.8] text-[#fff]`}>{content}</div>}
    </>
  );
}
