import { ReactElement } from "react";
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import AppHead from '@/components/AppHead';
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
          '500',
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
  const { t } = useTranslation('500');

  return (
    <div className="w-full relative">
      <AppHead />
      <Header />
      <ErrorPageLayout errorCode={500} errorMessage={t('serverSideError')} />
      <Footer />
    </div>
  )
}

export default NotFountPage;