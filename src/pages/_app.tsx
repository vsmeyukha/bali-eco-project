import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { appWithTranslation } from 'next-i18next';
import { useTranslation } from 'next-i18next';
import PopupProvider from '@/contexts/PopupProvider';

function App({ Component, pageProps }: AppProps) {
  const { i18n } = useTranslation();

  return (
    <PopupProvider>
      <div className='
        1440px:w-[1440px]
        2xl:w-[1536px]
        xl:w-[1280px]
        lg:w-[1024px]
        md:w-[768px]
        sm:w-[640px]
        w-screen
        bg-white
        mx-auto
        z-10'
      >
        <Component {...pageProps} />
      </div>
    </PopupProvider>
  )
}

export default appWithTranslation(App);