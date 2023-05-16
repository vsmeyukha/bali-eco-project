import { ReactElement, useContext } from "react";

interface ButtonProps {
  size: string,
  type: "button" | "submit" | "reset",
  onClick?: () => void,
  text: string
}

const BigBlueButton: React.FC<ButtonProps> = ({size, type, onClick, text}): ReactElement => {
  const changingStyles = size === "small" ? "w-full mt-[16px] text-[18px] leading-[22px]" : "w-[442px] mt-[40px] text-[24px] leading-[29px]";

  return (
    <button
      onClick={onClick}
      type={type}
      className={`
        ${changingStyles}
        h-[75px]
        bg-[#2196F3]
        rounded-[12px]
        text-white
        font-montserrat
        hover:scale-105
        transition-all 
        duration-300 
        ease-in-out`}
    >
      <p>{text}</p>
    </button>
  )
}

export default BigBlueButton;