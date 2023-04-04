import { ReactElement } from "react";
import { credits } from "@/utils/consts";
import Logo from "./Logo";
import Link from "next/link";
import Fb from '../../public/images/svgs/icons/fb.svg';
import Inst from '../../public/images/svgs/icons/inst.svg';
import Twitter from '../../public/images/svgs/icons/twitter.svg';

export default function Footer(): ReactElement {
  return (
    <footer className="
    bg-[#00265F]
    min-h-[202px]
    text-white 
    font-montserrat
    flex
    flex-col
    justify-end
    pb-[35px]
    min-w-full
    px-[65px]
    ">
      <div className="flex flex-row justify-between items-center">
        <Logo />
        <div className="text-[18px] leading-[22px]">
          <Link href="/">О проекте</Link>
          <Link href="/" className="ml-[60px]">Отзывы</Link>
          <Link href="/" className="ml-[60px]">Профиль</Link>
        </div>
        <div className="flex flex-row items-center">
          <Inst style={{ fill: "white" }} />
          <Twitter className="ml-[32px]" style={{ fill: "white" }}/>
          <Fb className="max-h-[20px] ml-[32px]" style={{ fill: "white" }} />
        </div>
      </div>
      <div className="flex flex-row text-[14px] leading-[17px] mt-[36px]">
        <p>Разработка:
          <a target={"_blank"} href="https://github.com/vsmeyukha">
            {credits.ru.Разработка}
          </a>
        </p>
        <p className="ml-[24px]">Дизайн: {credits.ru.Дизайн}</p>
        <p className="ml-[24px]">&#169; {credits.ru.copy}</p>
      </div>
    </footer>
  )
}