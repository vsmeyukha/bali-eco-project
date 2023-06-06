import { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import Menu from './Menu';
import Logo from "./Logo";
import QuickToolsPopup from "./QuickToolsPopup/QuickToolsPopup";
import SignInButton from "./MainPageNotLoggedIn/SignInButton";
import useViewportWidth from "@/hooks/calculateWidth";
import BurgerMenu from "./BurgerMenu";

import { UseTranslation, useTranslation } from "next-i18next";

interface HeaderProps {
  onPopupOpen?: () => void,
  openSignInPopup?: () => void,
}

export default function Header({onPopupOpen, openSignInPopup}: HeaderProps): ReactElement {
  const router = useRouter();
  const currentPage = router.pathname;

  const viewportWidth = useViewportWidth();

  const backgroundDependingOnThePage =
    currentPage === '/' ? 'bg-gradient-to-b from-green-800 via green-500 to-transparent' :
      currentPage === '/resources' ? 'bg-[#4CAF50]' : 'bg-[#0D87FF]';

  // ! градиент хэдера bg-gradient-to-b from-green-800 via green-500 to-transparent

  const handleSignInPopupOpen = (): void => {
    openSignInPopup?.();
    onPopupOpen?.();
  }

  const { i18n } = useTranslation();

  const [selectedLang, setSelectedLang] = useState<string>(i18n.language);

  const handleSetSelectedLang = (code: string): void => {
    setSelectedLang(code);
  }

  const [isDay, setIsDay] = useState<string>('on');
  
  const handleColorTheme = (code: string): void => {
    setIsDay(code);
  }

  return (
    <header
      className={
      `relative
      w-full
      flex
      flex-row
      justify-between
    text-white
      pt-[0px]
      md:px-[65px]
      px-[32px]
      z-30
      ${backgroundDependingOnThePage}`}
    >
      <Logo />
      {viewportWidth >= 1280
        ?
        <div className="flex flex-row items-center justify-center">
          <Menu />
          {
            currentPage === '/'
              ?
              <SignInButton openPopup={handleSignInPopupOpen} />
              :
              <QuickToolsPopup
                selectedLang={selectedLang}
                handleSetSelectedLang={handleSetSelectedLang}
                isDay={isDay}
                handleColorTheme={handleColorTheme}
              />
          }
        </div>
        :
        <BurgerMenu onSignInClick={handleSignInPopupOpen} />
      }
    </header>
  )
}

