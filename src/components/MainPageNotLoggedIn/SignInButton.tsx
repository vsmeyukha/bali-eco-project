import { ReactElement } from "react";
import { useTranslation } from "next-i18next";

interface SignInButtonProps {
  openPopup: () => void,
}

const SignInButton: React.FC<SignInButtonProps> = ({ openPopup }: SignInButtonProps): ReactElement => {
  const { t } = useTranslation('headerMenu');

  return (
    <button onClick={openPopup} type="button" className="w-[79px] h-[37px] rounded-[8px] font-montserrat text-[18px] leading-[22px] bg-[#D9D9D9] bg-opacity-5 shadow-button hover:shadow-button-hover transition duration-300">
      {t('signIn')}
    </button>
  )
}

export default SignInButton;