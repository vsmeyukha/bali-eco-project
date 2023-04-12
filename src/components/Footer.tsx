import { ReactElement } from "react";
import { credits } from "@/utils/consts";
import Logo from "./Logo";
import Link from "next/link";
import InstTwiFb from "./InstTwiFb";

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
        <InstTwiFb fill="white" />
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