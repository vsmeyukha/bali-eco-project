import { ReactElement } from "react";
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';

import { auth } from '../firebase/config';

interface ErrorPageLayoutProps {
  errorCode: number,
  errorMessage: string,
}

const ErrorPageLayout: React.FC<ErrorPageLayoutProps> = ({errorCode, errorMessage}): ReactElement => {
  const router = useRouter();

  const goBackToHomePage = (): void => {
    auth.currentUser ? router.push('/map') : router.push('/');
  }

  const { t } = useTranslation('404');
  
  return (
    <main
    className="
    font-montserrat
    font-normal
    text-[#4CAF50]
    flex
    flex-col
    justify-center
    items-center
    bg-404-not-found
    bg-cover
    bg-center
    h-screen"
  >
      <h2 className="sm:text-[150px] sm:leading-[183px] text-[100px] leading-[120px]">{errorCode}</h2>
      <p className="sm:text-[35px] sm:leading-[42px] text-[24px] leading-[24px] mt-[8px]">{errorMessage}</p>
    <button
      onClick={goBackToHomePage}
      type="button"
      className="
      sm:w-[346px]
      sm:h-[69px]
      w-[260px]
      h-[52px]
      bg-[#4CAF50]
      rounded-[8px]
      text-white
      sm:text-[20px]
      sm:leading-[24px]
      text-[16px]
      leading-[18px]
      mt-[40px]
      hover:scale-105
      transition-all 
      duration-300 
      ease-in-out">
      {t('toMain')}
    </button>
  </main>
  )
}

export default ErrorPageLayout;