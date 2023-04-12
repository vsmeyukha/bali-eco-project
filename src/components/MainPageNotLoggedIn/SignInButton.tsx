import { ReactElement } from "react";

interface SignInButtonProps {
  openPopup: () => void,
}

const SignInButton: React.FC<SignInButtonProps> = ({openPopup}: SignInButtonProps): ReactElement => {
  return (
    <button onClick={openPopup} type="button" className="w-[79px] h-[37px] rounded-[8px] font-montserrat text-[18px] leading-[22px] bg-[#D9D9D9] bg-opacity-5 shadow-button hover:shadow-button-hover transition duration-300">
      Войти
    </button>
  )
}

export default SignInButton;