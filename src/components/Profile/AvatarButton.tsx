import { ReactElement, ReactNode } from "react";
import RoundGreyButton from "./RoundGreyButton";

interface AvatarButtonProps {
  icon: ReactNode,
  text: string,
  onClick?: (event: React.MouseEvent<HTMLElement>) => void,
}

const AvatarButton: React.FC<AvatarButtonProps> = ({icon, text, onClick}): ReactElement => {
  return (
    <div className="flex flex-col items-center" onClick={onClick}>
      <RoundGreyButton>
        {icon}
      </RoundGreyButton>
      <button type="button" className="font-montserrat text-[16px] leading-[20px] text-[#00265F] mt-[4px] hover:cursor-pointer hover:text-[#0D87FF]" >
        {text}
      </button>
    </div>
  );
}

export default AvatarButton;