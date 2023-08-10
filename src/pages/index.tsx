import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { z } from 'zod';

import AppHead from '@/components/AppHead';
import Header from '@/components/Header';
import Main from '@/components/MainPageNotLoggedIn/Main';
import Footer from '@/components/Footer/Footer';

// import UnauthenticatedRoute from '@/routes/UnauthinticatedRoute';
import createRoute from '@/routes/Route';

const popupState = z.enum(['', 'regPopup', 'signInPopup']);
export type popupStateType = z.infer<typeof popupState>;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const typedLocale = locale as string;
  return {
    props: {
      ...(await serverSideTranslations(
        typedLocale,
        [
          'headerMenu',
          'mainPageNotLoggedIn',
          'footer',
          'registerPopup',
          'signInPopup',
          'authErrors'
        ],
        null,
        ['en', 'ru', 'id']
      )),
    },
  }
}

const UnauthenticatedRoute = createRoute("unauthenticated");


export default function Home() {
  const { i18n } = useTranslation();

  useEffect(() => { 
    const defaultLang = localStorage.getItem('language');
    if (defaultLang) {
      i18n.changeLanguage(defaultLang);
    }
  }, [i18n]);

  const [popup, setPopup] = useState<popupStateType>('');

  const handleOpenRegPopup = (): void => {
    setPopup('regPopup');
  }

  const handleOpenSignInPopup = (): void => {
    setPopup('signInPopup');
  }

  const closePopup = (): void => {
    setPopup('');
  }

  return (
    <UnauthenticatedRoute>
      <AppHead />
      <div className="bg-ocean-reef bg-cover bg-center flex flex-col justify-between min-h-screen w-full">
        <Header openSignInPopup={handleOpenSignInPopup} />
        <Main
          popup={popup}
          onPopupClose={closePopup}
          openRegPopup={handleOpenRegPopup}
          openSignInPopup={handleOpenSignInPopup}
        />
        <Footer />
      </div>
    </UnauthenticatedRoute>
  )
}