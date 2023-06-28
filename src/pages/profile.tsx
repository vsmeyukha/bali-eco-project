import { FormEvent, ReactElement, useEffect } from "react";
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";

import Header from "@/components/Header";
import Footer from "@/components/Footer/Footer";
import AvatarBlock from "@/components/Profile/AvatarBlock";
import ProfileForm from "@/components/Profile/ProfileForm";

export const getStaticProps: GetStaticProps = async ({locale}) => {
  const typedLocale = locale as string;

  return {
    props: {
      ... (await serverSideTranslations(
        typedLocale,
        [
          'headerMenu',
          'profile',
          'footer',
          'quickToolsPopup',
        ],
        null,
        ['en', 'ru', 'id'],
      )),
    }
  }
}

const Profile: React.FC = (): ReactElement => {
  const { t, i18n } = useTranslation('profile');

  useEffect(() => { 
    const defaultLang = localStorage.getItem('language');
    if (defaultLang) {
      i18n.changeLanguage(defaultLang);
    }
  }, []);

  return (
    <>
      <Header />
      <section className="bg-[#F5F5F5] 1440px:px-[152px] xl:px-[100px] lg:px-[50px] py-[60px]">
        <h3 className="font-oceanic-bold text-[20px] leading-[24px] text-[#00265F]">{ t('yourData')}</h3>
        <div className="bg-white flex flex-col w-full rounded-[10px] mt-[24px]">
          <AvatarBlock />
          <ProfileForm />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Profile;