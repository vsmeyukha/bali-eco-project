import { ReactElement } from "react";
import Link from "next/link";
import Logo from '../Logo';
import InstTwiFb from '../InstTwiFb';
import { credits } from "@/utils/consts";

const FooterDesktop: React.FC = (): ReactElement => {

  return (
    <>
      <div className='flex flex-row justify-between items-center w-full mt-[32px]'>
        <Logo />
        <div className="text-[18px] leading-[22px]">
          <Link href="/">О проекте</Link>
          <Link href="/" className="ml-[60px]">Отзывы</Link>
          <Link href="/" className="ml-[60px]">Профиль</Link>
        </div>
        <InstTwiFb fill="white" />
      </div>
      <div className="flex flex-row text-[14px] leading-[17px] mt-[36px] mb-[32px]">
        <p>Разработка:
          <a target={"_blank"} href="https://github.com/vsmeyukha">
            {credits.ru.Разработка}
          </a>
        </p>
        <p className="ml-[24px]">Дизайн: {credits.ru.Дизайн}</p>
        <p className="ml-[24px]">&#169; {credits.ru.copy}</p>
      </div>
    </>
  );
}

export default FooterDesktop;