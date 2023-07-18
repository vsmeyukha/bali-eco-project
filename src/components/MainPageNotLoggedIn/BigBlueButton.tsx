import { Children, ReactElement, ReactNode } from "react";

interface ButtonProps {
  size: string,
  type: "button" | "submit" | "reset",
  onClick?: () => void,
  text: string,
  disabled?: boolean,
  children?: ReactNode
}

const BigBlueButton: React.FC<ButtonProps> = ({size, type, onClick, text, disabled, children}): ReactElement => {
  const changingStyles = size === "small" ? "w-full mt-[16px] text-[18px] leading-[22px]" : "w-[442px] mt-[40px] text-[24px] leading-[29px]";
  const disabledStyles = disabled ? "bg-gray-300 hover:scale-100 cursor-default" : "";

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`
        ${changingStyles}
        h-[75px]
        flex
        flex-row
        justify-center
        items-center
        bg-[#2196F3]
        rounded-[12px]
        text-white
        font-montserrat
        hover:scale-105
        transition-all 
        duration-300 
        ease-in-out
        ${disabledStyles}
      `}
    >
      {children}
      <p>{text}</p>
    </button>
  )
}

export default BigBlueButton;