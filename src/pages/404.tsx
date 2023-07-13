import { ReactElement } from "react";
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Header from "@/components/Header";
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
  const { t } = useTranslation('404');

  return (
    <div className="w-full relative">
      <Header />
      <ErrorPageLayout errorCode={404} errorMessage={t('pageNotFound')} />
      <Footer />
    </div>
  )
}

export default NotFountPage;