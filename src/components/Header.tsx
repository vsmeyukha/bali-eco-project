import { ReactElement, useContext, Fragment, useState } from "react";
import { useRouter } from "next/router";
import Menu from './Menu';
import Logo from "./Logo";
import QuickToolsPopup from "./QuickToolsPopup/QuickToolsPopup";
import SignInButton from "./MainPageNotLoggedIn/SignInButton";
import useViewportWidth from "@/hooks/calculateWidth";
import BurgerMenu from "./BurgerMenu";

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

  const handleSignInPopupOpen = () => {
    openSignInPopup?.();
    onPopupOpen?.();
  }

  return (
    <header
      className={
      `relative
      flex
      flex-row
      justify-between
    text-white
      pt-[0px]
      pl-[65px]
      pr-[65px]
      z-30
      ${backgroundDependingOnThePage}`}
    >
      <Logo />
      {viewportWidth >= 1280
        ?
        <div className="flex flex-row items-center justify-center">
        <Menu />
        {
          currentPage === '/' ? <SignInButton openPopup={handleSignInPopupOpen} /> : <QuickToolsPopup />
        }
        </div>
        :
        <BurgerMenu />
      }
    </header>
  )
}

