import { ReactElement, useEffect } from "react";
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Header from "@/components/HeaderFor404";
import Footer from "@/components/Footer/Footer";
import ErrorPageLayout from "@/components/ErrorPageLayout";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const typedLocale = locale as string;
  return {
    props: {
      ...(await serverSideTranslations(
        typedLocale,
        [
          '404',
          'headerMenu',
          'footer',
          'quickToolsPopup'
        ],
        null,
        ['en', 'ru', 'id']
      )),
    },
  }
}

const NotFountPage: React.FC = (): ReactElement => {
  const { t, i18n } = useTranslation('404');

  // ? устанавливаем для страницы ранее выбранный пользователем язык, если он сохранен в localStorage
  useEffect(() => { 
    const defaultLang = localStorage.getItem('language');
    if (defaultLang) {
      i18n.changeLanguage(defaultLang);
    }
  }, [i18n]);

  return (
    <div className="w-full relative">
      <Header />
      <ErrorPageLayout errorCode={404} errorMessage={t('pageNotFound')} />
      <Footer />
    </div>
  )
}

export default NotFountPage;