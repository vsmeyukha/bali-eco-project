import { ReactElement, useState } from "react";
import { useRouter } from "next/router";

import Menu from './Menu';
import Logo from "./Logo";
import QuickToolsPopup from "./QuickToolsPopup/QuickToolsPopup";
import SignInButton from "./MainPageNotLoggedIn/SignInButton";
import useViewportWidth from "@/hooks/calculateWidth";
import BurgerMenu from "./BurgerMenu";

import { auth } from '../firebase/config';

interface HeaderProps {
  openSignInPopup?: () => void,
}

// ? Header Component
// ? This component renders the main navigation bar/header of the application.
// ? It contains the site logo, main navigation menu, and user-related controls like sign -in button or quick tools popup depending on user's authentication status.

export default function Header({ openSignInPopup }: HeaderProps): ReactElement {
  const router = useRouter();
  const currentPage = router.pathname;

  const viewportWidth = useViewportWidth(); // ? Custom hook to get the viewport width

  // ? Determine background gradient/style based on current page route
  const backgroundDependingOnThePage =
    currentPage === '/'
    ?
    'bg-gradient-to-b from-green-800 via green-500 to-transparent'
    :
    currentPage === '/resources' ? 'bg-[#4CAF50]' : 'bg-[#0D87FF]';

  // ! градиент хэдера bg-gradient-to-b from-green-800 via green-500 to-transparent

  // ? State and handler for tracking day/night mode
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
      {/* Display appropriate components based on viewport width */}
      {viewportWidth >= 1280
        ?
        <div className="flex flex-row items-center justify-center">
          <Menu />

          {/* Conditionally render either the Sign In button or the QuickTools popup based on authentication status */}
          {
            !auth.currentUser
              ?
              <SignInButton openPopup={openSignInPopup} />
              :
              <QuickToolsPopup
                isDay={isDay}
                handleColorTheme={handleColorTheme}
              />
          }
        </div>
        :
        // ? For smaller screens, display a burger menu
        <BurgerMenu onSignInClick={openSignInPopup} />
      }
    </header>
  )
}

