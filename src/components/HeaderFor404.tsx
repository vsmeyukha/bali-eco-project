import { ReactElement } from "react";

import Menu from './Menu';
import Logo from "./Logo";
import useViewportWidth from "@/hooks/calculateWidth";
import BurgerMenu from "./BurgerMenu";

export default function Header(): ReactElement {
  const viewportWidth = useViewportWidth();

  return (
    <header
      className='
      relative 
      w-full 
      bg-[#0D87FF] 
      flex 
      flex-row 
      justify-between 
      text-white 
      pt-[0px] 
      md:px-[65px] 
      px-[32px] 
      z-30'
    >
      <Logo />
      {viewportWidth >= 1280
        ?
        <div className="flex flex-row items-center justify-center">
          <Menu />
        </div>
        :
        <BurgerMenu />
      }
    </header>
  )
}

