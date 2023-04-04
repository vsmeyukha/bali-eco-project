import { ReactElement, useContext, Fragment } from "react";
import { useRouter } from "next/router";
import Menu from './Menu';
import Logo from "./Logo";
import QuickToolsPopup from "./QuickToolsPopup";

export default function Header(): ReactElement {
  const router = useRouter();
  const currentPage = router.pathname;

  const backgroundDependingOnThePage =
    currentPage === '/' ? 'bg-gradient-to-b from-green-800 via green-500 to-transparent' :
      currentPage === '/resources' ? 'bg-[#4CAF50]' : 'bg-[#0D87FF]';

  // ! градиент хэдера bg-gradient-to-b from-green-800 via green-500 to-transparent

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
      <div className="flex flex-row items-center">
        <Menu />
        <QuickToolsPopup />
      </div>
    </header>
  )
}

