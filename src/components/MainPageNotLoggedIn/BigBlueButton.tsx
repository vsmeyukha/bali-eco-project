import { ReactElement, useContext } from "react";

interface ButtonProps {
  size: string,
  type: "button" | "submit" | "reset",
  onClick?: () => void,
  text: string
}

const BigBlueButton: React.FC<ButtonProps> = ({size, type, onClick, text}): ReactElement => {
  const changingStyles = size === "small" ? "w-[293px] mt-[16px]" : "w-[442px] mt-[40px]";

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
        text-[24px]
        leading-[29px]
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