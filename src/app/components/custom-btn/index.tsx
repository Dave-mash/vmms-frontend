"use client";

interface IBTNType {
  content: string;
  onClick: () => void;
  btnType: string;
  color: string;
  icon: any;
  styles: any;
  type: string | undefined;
  value: string;
  onChange: () => void;
  onBlur: () => void;
}

export const CustomBtn = (props: any) => {
  const {
    content,
    onClick,
    btnType,
    color,
    icon,
    styles,
    type,
    value,
    onChange,
    onBlur,
  }: IBTNType = props;
  const newStyles: string = styles?.join(" ");
  const defaultType = type ?? "button";

  return (
    <button
      onClick={onClick}
      className={`cursor-pointer flex items-center py-[.8rem] rounded-sm w-[13rem] justify-center ${
        btnType === "primary-2" && `text-[${color}] `
      } ${btnType === "primary" && `text-[#fff]`} ${newStyles}`}
      type={"submit"}
    >
      {content} {icon && icon}
    </button>
  );
};
