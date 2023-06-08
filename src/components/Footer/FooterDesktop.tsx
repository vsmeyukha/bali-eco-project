import { ReactElement } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import Logo from '../Logo';
import InstTwiFb from '../InstTwiFb';
import { credits } from "@/utils/consts";

const FooterDesktop: React.FC = (): ReactElement => {
  const { t } = useTranslation('footer');

  return (
    <>
      <div className='flex flex-row justify-between items-center w-full mt-[32px]'>
        <Logo />
        <div className="text-[18px] leading-[22px]">
          <Link href="/">{ t('aboutUs')}</Link>
          <Link href="/" className="ml-[60px]">{t('feedback')}</Link>
          <Link href="/" className="ml-[60px]">{t('profile')}</Link>
        </div>
        <InstTwiFb fill="white" />
      </div>
      <div className="flex flex-row text-[14px] leading-[17px] mt-[36px] mb-[32px]">
        <p>{t('dev')}
          <a target={"_blank"} href="https://github.com/vsmeyukha">
          {t('devName')}
          </a>
        </p>
        <p className="ml-[24px]">{t('design')}</p>
        <p className="ml-[24px]">&#169; {credits.ru.copy}</p>
      </div>
    </>
  );
}

export default FooterDesktop;