import { ReactElement } from "react";

interface ButtonProps {
  text: string,
  isSelected: boolean,
  onClick: (code: string) => void,
  code: string,

}

const QuickPopupSwitchButton: React.FC<ButtonProps> = ({ text, isSelected, onClick, code }): ReactElement => {
  const buttonStyles = "w-[64px] h-[28px] rounded-[7px] font-montserrat text-[13px] text-[#00265F] leading-[20px]";
  const selectedButtonStyles = "bg-white font-bold border border-[rgba(0,0,0,0.04)] transition ease-out duration-200";

  return (
    <button
      type="button"
      className={`${buttonStyles} ${isSelected && selectedButtonStyles}`}
      onClick={() => onClick(code)}
    >{text}</button>
  );
}

export default QuickPopupSwitchButton;