// ? Required React imports
import { useState, useEffect } from 'react';

// ? Next.js specific imports
import { GetStaticProps } from 'next';

// ? Internationalization (i18n) imports
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

// ? Zod library for data validation
import { z } from 'zod';

// ? Component imports
import AppHead from '@/components/AppHead';
import Header from '@/components/Header';
import Main from '@/components/MainPageNotLoggedIn/Main';
import Footer from '@/components/Footer/Footer';

// ? Custom route creation utility
import createRoute from '@/routes/Route';

// ? State definition for the popup using Zod's enum validation
const popupState = z.enum(['', 'regPopup', 'signInPopup']);
export type popupStateType = z.infer<typeof popupState>;

// ? // Static props for server-side translations
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

// ? Creating an unauthenticated route component
const UnauthenticatedRoute = createRoute("unauthenticated");

// ? Main Home component
export default function Home() {

  // ? Hook for i18n translations functionality
  const { i18n } = useTranslation();

  // ? useEffect hook to set the page's language.
  // ? Upon the component's mount, the hook checks if there's a preferred language saved in the user's localStorage. If a preferred language is found, the app's language is updated to match this preference using the `i18n.changeLanguage` method.
  // ? This ensures that a user always sees the app in their previously selected language preference whenever they revisit the application.

  useEffect(() => { 
    const defaultLang = localStorage.getItem('language');
    if (defaultLang) {
      i18n.changeLanguage(defaultLang);
    }
  }, [i18n]);

  // ? State management for registration or sign-in popup status
  const [popup, setPopup] = useState<popupStateType>('');

  // ? Handlers for opening registration or sign-in popup
  const handleOpenRegPopup = (): void => {
    setPopup('regPopup');
  }

  const handleOpenSignInPopup = (): void => {
    setPopup('signInPopup');
  }

  // ? Handler for closing the popup
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