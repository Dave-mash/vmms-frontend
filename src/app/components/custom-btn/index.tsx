"use client";

interface IBTNType {
  content: string;
  onClick: () => void;
  btnType: string;
  color: string;
  icon: any;
  styles: any;
}

export const CustomBtn = (props: any) => {
  const { content, onClick, btnType, color, icon, styles }: IBTNType = props;
  const newStyles: string = styles?.join(" ");

  return (
    <button
      onClick={onClick}
      className={`cursor-pointer flex items-center py-[.8rem] rounded-sm w-[13rem] justify-center ${
        btnType === "primary-2" && `text-[${color}] `
      } ${btnType === "primary" && `text-[#fff]`} ${newStyles}`}
    >
      {content} {icon && icon}
    </button>
  );
};
