import { ReactElement, useState, useRef, useEffect } from "react";
import { GetStaticProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { z } from 'zod';

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

import { getAllMarkers } from "@/firebase/firestore";

import NotVerifiedUserPopup from "@/components/informationPopups/notVerifiedUserPopup/NotVerifiedUserPopup";
import DeletePostPopup from "@/components/informationPopups/deletePostPopup/DeletePostPopup";

import createRoute from '@/routes/Route';

import {auth} from '../firebase/config'

export interface IPost {
  title: string,
  comment: string,
  imageUrl: string | undefined,
  id?: string,
  // isItDirtyMarks: number
}

export interface IMarker {
  coordinates: Coordinates,
  id?: string
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
          'notVerifiedEmailPopup'
        ],
        null,
        ['en', 'ru', 'id']
      )),
    },
  }
}

const ProtectedRoute = createRoute("protected");

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

  // todo переименовать coordinates в markers, все что щас есть со словом marker - в post, newMarker - в newPost 
  // ? стейт маркеров
  const [markers, setCoordinates] = useState<IMarker[]>([]);

  const [newMarker, setNewMarker] = useState<IMarker | null>(null);

  // ? стейт активного маркера
  const [activePost, setActivePost] = useState<IPost | null>(null);

  // ? стейт нового маркера, который редактируется
  const [newPost, setNewPost] = useState<IPost | null>(null);

  const [photoStatus, setPhotoStatus] = useState<photoStatus>('loading');

  // ? стейт, показывающий, верифицирована ли у пользователя почта
  const [isPopupForNotVerifiedUsersOpen, setIsPopupForNotVerifiedUsersOpen] = useState<boolean>(false);

  const [isDeletePostPopupOpen, setIsDeletePostPopupOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchMarkers = async () => {
      const markers = await getAllMarkers();
      setCoordinates(markers);
      console.log(markers);
    }
    if (auth.currentUser) {
      fetchMarkers();
    }
  }, []);

  const popupRef = useRef<HTMLDivElement | null>(null);

  const handlePopupClose = (e: React.MouseEvent): void => {
    if (Boolean(activePost) && popupRef.current && !popupRef.current.contains(e.target as Node)) {
      setActivePost(null);
      setPhotoStatus('loading');
    }

    console.log('handlePopupClose');
  }

  return (
    <ProtectedRoute>
      <div className="w-full relative" onClick={handlePopupClose}>
        <Header />
        {viewportWidth > 640 && <PublishPhoto />}
        <MapComponent
          activePost={activePost}
          setActivePost={setActivePost}
          newPost={newPost}
          setNewPost={setNewPost}
          setIsPopupForNotVerifiedUsersOpen={setIsPopupForNotVerifiedUsersOpen}
          setPhotoStatus={setPhotoStatus}
          markers={markers}
          newMarker={newMarker}
          setNewMarker={setNewMarker}
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
          activePost={activePost}
          setActivePost={setActivePost}
          photoStatus={photoStatus}
          setPhotoStatus={setPhotoStatus}
          setCoordinates={setCoordinates}
          setIsDeletePostPopupOpen={setIsDeletePostPopupOpen}
        />
        <AddPostPopup
          setActivePost={setActivePost}
          newPost={newPost}
          setNewPost={setNewPost}
          newMarker={newMarker}
          setNewMarker={setNewMarker}
          setCoordinates={setCoordinates}
        />
        <NotVerifiedUserPopup
          open={isPopupForNotVerifiedUsersOpen}
          onClose={setIsPopupForNotVerifiedUsersOpen}
        />
        <DeletePostPopup
          open={isDeletePostPopupOpen}
          onClose={setIsDeletePostPopupOpen}
          activePost={activePost}
          setActivePost={setActivePost}
          setCoordinates={setCoordinates}
        />
        <Footer />
      </div>
    </ProtectedRoute>
  )
}

export default LoggedInMain;