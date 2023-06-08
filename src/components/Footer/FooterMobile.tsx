import { ReactElement } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import Logo from '../Logo';
import InstTwiFb from '../InstTwiFb';
import { credits } from "@/utils/consts";

import useViewportWidth from "@/hooks/calculateWidth";

const FooterMobile: React.FC = (): ReactElement => {
  const viewportWidth = useViewportWidth();
  
  const creditsLayout = viewportWidth >= 768 ? 'flex-row space-x-[60px]' : 'flex-col space-y-[8px] items-end';

  const { t } = useTranslation('footer');

  return (
    <>
      <div className="flex flex-row justify-between items-center w-full mt-[12px]">
        <Logo />
        <div className={`text-[14px] leading-[17px] flex ${creditsLayout}`}>
          <Link href="/">{ t('aboutUs')}</Link>
          <Link href="/" className="">{t('feedback')}</Link>
          <Link href="/" className="">{t('profile')}</Link>
        </div>
      </div>
      <div className="flex flex-row justify-between items-start mt-[27px] mb-[12px]">
        <div className="flex flex-col text-[14px] leading-[17px] space-y-[16px]">
          {/* <p>Разработка:
            <a target={"_blank"} href="https://github.com/vsmeyukha">
              {credits.ru.Разработка}
            </a>
          </p>
          <p>Дизайн: {credits.ru.Дизайн}</p> */}
          <p>&#169; {credits.ru.copy}</p>
        </div>
        <InstTwiFb fill="white" />
      </div>
    </>
  );
}

export default FooterMobile;