import { ReactElement, useContext } from "react";
import { register } from '@/utils/consts';

interface ButtonProps {
  size: string,
  type: "button" | "submit" | "reset",
  onClick?: () => void,
}

const RegistrationButton: React.FC<ButtonProps> = ({size, type, onClick}): ReactElement => {
  const changingStyles = size === "small" ? "w-[282px] mt-[16px]" : "w-[442px] mt-[40px]";

  return (
    <button
      onClick={onClick}
      type={type}
      className={`
        ${changingStyles}
        h-[77px]
      bg-[#2196F3]
        rounded-[12px]
      text-white
        font-oceanic-medium
        text-[24px]
        leading-[29px]
      hover:scale-105
      transition-all 
      duration-300 
      ease-in-out`}
    >
      {register.ru}
    </button>
  )
}

export default RegistrationButton;