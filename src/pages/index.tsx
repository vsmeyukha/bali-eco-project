import { ReactElement, useState, MouseEvent, useContext } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Main from '@/components/MainPageNotLoggedIn/Main';
import Footer from '@/components/Footer';

export default function Home() {

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  }

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  }

  const [isRegPopup, setIsRegPopup] = useState<boolean>(true);

  const openRegPopup = () => {
    setIsRegPopup(true);
  }

  const openSignInPopup = () => {
    setIsRegPopup(false);
  }

  return (
    <main className="bg-ocean-reef bg-cover bg-bottom flex flex-col justify-between min-h-screen w-full">
      <Head>
      <title>BaliGreenMap</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.svg" />
      </Head>
      <Header onPopupOpen={handlePopupOpen} openSignInPopup={openSignInPopup} />
      <Main
        isPopupOpen={isPopupOpen}
        onPopupOpen={handlePopupOpen}
        onPopupClose={handlePopupClose}
        isRegPopup={isRegPopup}
        openRegPopup={openRegPopup}
        openSignInPopup={openSignInPopup}
      />
      <Footer />
    </main>
  )
}