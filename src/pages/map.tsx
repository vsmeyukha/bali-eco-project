import { ReactElement, useState, useRef, useEffect } from "react";
import { GetStaticProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { z } from 'zod';

import ProtectedRoute from "@/routes/ProtectedRoute";

import Header from "@/components/Header";
import PublishPhoto from "@/components/MainPageLoggedIn/PublishPhoto";
import MapComponent from "@/components/MainPageLoggedIn/map/GoogleMaps";
import ClimateAndEduContainer from "@/components/MainPageLoggedIn/ClimateAndEduContainer";
import ClimateChange from "@/components/MainPageLoggedIn/ClimateChange";
import Education from "@/components/MainPageLoggedIn/Education";
import AboutUs from "@/components/MainPageLoggedIn/AboutUs";
import Tips from "@/components/MainPageLoggedIn/Tips";
import Volunteers from "@/components/MainPageLoggedIn/Volunteers";
import Footer from "@/components/Footer/Footer";
import BigPostOnMap from "@/components/MainPageLoggedIn/map/postOnMap/BigPostOnMap";
import useViewportWidth from "@/hooks/calculateWidth";
import PublishPhotoButton from "@/components/MainPageLoggedIn/PublishPhotoButton";
import AddPostPopup from "@/components/MainPageLoggedIn/addPostPopup";

import { Coordinates, CoordsConvertedToPixels } from "@/components/MainPageLoggedIn/map/GoogleMaps";

import { getAllPosts } from "@/firebase/firestore";

import Popup from "@/components/Popup";

export interface IMarker {
  coordinates: Coordinates,
  coordsToPixels: CoordsConvertedToPixels,
  title: string,
  comment: string,
  imageUrl: string | undefined,
  id: string,
  // comments: number,
  // isItDirtyMarks: number
}

const photoStatusCodes = z.enum(['success', 'loading', 'error']);
export type photoStatus = z.infer<typeof photoStatusCodes>;

// ? локализация. загружаем локали и файлы с переводами, которые потребуются на этой странице
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const typedLocale = locale as string;
  return {
    props: {
      ...(await serverSideTranslations(
        typedLocale,
        [
          'headerMenu',
          'mapPage',
          'chatGPT',
          'addPostPopup',
          'bigPostPopup',
          'footer',
          'quickToolsPopup',
        ],
        null,
        ['en', 'ru', 'id']
      )),
    },
  }
}

const LoggedInMain: React.FC = (): ReactElement => {
  const { i18n } = useTranslation();

  // ? устанавливаем для страницы ранее выбранный пользователем язык, если он сохранен в localStorage
  useEffect(() => { 
    const defaultLang = localStorage.getItem('language');
    if (defaultLang) {
      i18n.changeLanguage(defaultLang);
    }
  }, [i18n]);

  // ? считаем ширину экрана
  const viewportWidth = useViewportWidth();

  // ? стейт маркеров
  const [markers, setMarkers] = useState<IMarker[]>([]);

  // ? стейт активного маркера
  const [activeMarker, setActiveMarker] = useState<IMarker | null>(null);

  // ? стейт нового маркера, который редактируется
  const [newMarker, setNewMarker] = useState<IMarker | null>(null);

  // ? стейт, показывающий, верифицирована ли у пользователя почта
  const [notVerifiedPopupOpen, setNotVerifiedPopupOpen] = useState<boolean>(false);

  const [isMarkerClicked, setIsMarkerClicked] = useState<boolean>(false);

  const [photoStatus, setPhotoStatus] = useState<photoStatus>('loading');

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getAllPosts();
      setMarkers(posts);
    }

    fetchPosts();
  }, []);

  const popupRef = useRef<HTMLDivElement | null>(null);

  const handlePopupClose = (e: React.MouseEvent): void => {
    if (Boolean(activeMarker) && popupRef.current && !popupRef.current.contains(e.target as Node)) {
      setActiveMarker(null);
      setPhotoStatus('loading');
    }

    console.log('handlePopupClose');
    setIsMarkerClicked(false);
  }

  return (
    <ProtectedRoute>
      <div className="w-full relative" onClick={handlePopupClose}>
        <Header />
        {viewportWidth > 640 && <PublishPhoto />}
        <MapComponent
          markers={markers}
          activeMarker={activeMarker}
          setActiveMarker={setActiveMarker}
          newMarker={newMarker}
          setNewMarker={setNewMarker}
          setNotVerifiedPopupOpen={setNotVerifiedPopupOpen}
          setIsMarkerClicked={setIsMarkerClicked}
          setPhotoStatus={setPhotoStatus}
        />
        
        {
          viewportWidth < 1024
          &&
          <PublishPhotoButton />
        }
        <ClimateAndEduContainer>
          <ClimateChange />
          <Education />
        </ClimateAndEduContainer>
        <AboutUs />
        <Tips />
        <Volunteers />
        <BigPostOnMap
          ref={popupRef}
          activeMarker={activeMarker}
          setMarkers={setMarkers}
          setActiveMarker={setActiveMarker}
          photoStatus={photoStatus}
          setPhotoStatus={setPhotoStatus}
        />
        <AddPostPopup
          setMarkers={setMarkers}
          setActiveMarker={setActiveMarker}
          newMarker={newMarker}
          setNewMarker={setNewMarker}
        />
        {notVerifiedPopupOpen
          &&
          <Popup
            notVerifiedPopupOpen={notVerifiedPopupOpen}
            setNotVerifiedPopupOpen={setNotVerifiedPopupOpen}
          />
        }
        <Footer />
      </div>
    </ProtectedRoute>
  )
}

export default LoggedInMain;