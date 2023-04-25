import { ReactElement, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode,
}

const RoundGreyButton: React.FC<ButtonProps> = ({children}): ReactElement => {
  return (
    <button className="bg-[#00265F] bg-opacity-10 h-[70px] w-[70px] rounded-full flex justify-center items-center hover:scale-110 transform transition duration-200">
      {children}
    </button>
  );
}

export default RoundGreyButton;