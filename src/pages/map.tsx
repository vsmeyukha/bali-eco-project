import { ReactElement, useState, useRef, useEffect } from "react";
import { GetStaticProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { z } from 'zod';

import AppHead from "@/components/AppHead";
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

// ? Interface describing a post attached to a marker on the map
// ? Интерфейс, описывающий пост, прикрепленный к маркеру на карте
export interface IPost {
  title: string,
  comment: string,
  imageUrl: string | undefined,
  id?: string,
  owner?: string
  // isItDirtyMarks: number
}

// ? Interface describing a marker on the map
// ? Интерфейс, описывающий маркер на карте
export interface IMarker {
  coordinates: Coordinates,
  id?: string
}

// ? Photostatus typing, which determines whether to show the photo, whether to show the loader while the photo is being loaded, or whether to show an error if the photo has not loaded

// ? Типизация фотостатуса, от которого зависит, показывать ли фото, показывать ли лоадер, пока фото грузится, или показывать ошибку, если фото не загрузилось
const photoStatusCodes = z.enum(['success', 'loading', 'error']);
export type photoStatus = z.infer<typeof photoStatusCodes>;

// ? Localization. Uploading locales and files with translations needed for this page
// ? Локализация. загружаем локали и файлы с переводами, которые потребуются на этой странице
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
          'notVerifiedEmailPopup',
          'deletePostPopup'
        ],
        null,
        ['en', 'ru', 'id']
      )),
    },
  }
}

// ? Creating of protected route HOC
// ? Создаем HOC защищенного маршрута
const ProtectedRoute = createRoute("protected");

const LoggedInMain: React.FC = (): ReactElement => {
  const { i18n } = useTranslation();

  // ? Setting the language that was chosen by a user to the page, if it is saved to localStorage
  // ? устанавливаем для страницы ранее выбранный пользователем язык, если он сохранен в localStorage
  useEffect(() => { 
    const defaultLang = localStorage.getItem('language');
    if (defaultLang) {
      i18n.changeLanguage(defaultLang);
    }
  }, [i18n]);

  // ? Calculating the width of viewport
  // ? Считаем ширину окна
  const viewportWidth = useViewportWidth();

  // ? This state is an array of markers, that is, entities of the IMarker type. Used for rendering markers on the map.
  // ? Этот стейт представляет собой массив маркеров, то есть сущностей типа IMarker. Используется для рендеринга маркеров на карте.
  const [markers, setMarkers] = useState<IMarker[]>([]);

  // ? This state is a single entity of the IMarker type. Used in the pop-up of adding a new post.
  // ? Этот стейт представляет собой одну сущность типа IMarker. Используется в попапе добавления нового поста. 
  const [newMarker, setNewMarker] = useState<IMarker | null>(null);

  // ? This state is a single entity of the IMarker type. Used in the post display popup.
  // ? Этот стейт представляет собой одну сущность типа IMarker. Используется в попапе отображения поста.
  const [activePost, setActivePost] = useState<IPost | null>(null);

  // ? стейт нового маркера, который редактируется
  const [newPost, setNewPost] = useState<IPost | null>(null);

  // ? Photostatus state. The default value is 'loading' to show the loader while the photo is being loaded.
  // ? Стейт фотостатуса. Дефолтное значение - 'loading', чтобы показывать лоадер, пока грузится фотография.
  const [photoStatus, setPhotoStatus] = useState<photoStatus>('loading');

  // ? The state responsible for opening a pop-up with a warning for users with unverified mail.
  // ? Стейт, отвечающий за открытие попапа с предупреждением для пользователей с неверифицрованной почтой.
  const [isPopupForNotVerifiedUsersOpen, setIsPopupForNotVerifiedUsersOpen] = useState<boolean>(false);

  // ? The state responsible for opening the post deletion confirmation popup.
  // ? Стейт, отвечающий за открытие попапа подтверждения удаления поста.
  const [isDeletePostPopupOpen, setIsDeletePostPopupOpen] = useState<boolean>(false);

  // ? When rendering a page, we request a list of markers from firebase and add them to state markers. Recall that the state markers is an array of entities of the IMarker type.
  // ? При рендеринге страницы запрашиваем список маркеров из firebase и складываем их в стейт markers. Напомним, что стейт markers - это массив сущностей типа IMarker.
  useEffect(() => {
    const fetchMarkers = async () => {
      const markers = await getAllMarkers();
      setMarkers(markers);
    }
    fetchMarkers();
  }, []);

  // ? Creating a ref to the pop-up displaying the post.
  // ? Создаем реф на попап отображения поста.
  const popupRef = useRef<HTMLDivElement | null>(null);

  // ? We need a ref for the pop-up, because the pop-up should be closed by clicking anywhere in the viewport, except for the pop-up itself. The pop-up closing function checks whether there is an activePost state or it is null, whether there is a ref on the pop-up or it is null, and whether the clicked element (e.target) is a pop-up or some element inside the popup. If the conditions are met, activePost is set to null, photostatus is set to 'loading', and isPopupForNotVerifiedUsersOpen is set to false.

  // ? Реф на попап нам нужен, потому что попап должен закрываться по клику в любом месте сайта, кроме самого попапа. Функция закрытия попапа проверяет, есть ли стейт activePost или он равен null, есть ли реф на попап или он равен null и то, не является ли кликнутый элемент (e.target) попапом или каким-либо элементов внутри попапа. Если условия выполнены, то activePost приводится к null, photoStatus к 'loading', а isPopupForNotVerifiedUsersOpen - к false.
  const handlePopupClose = (e: React.MouseEvent): void => {
    if (Boolean(activePost) && popupRef.current && !popupRef.current.contains(e.target as Node)) {
      setActivePost(null);
      setPhotoStatus('loading');
      setIsPopupForNotVerifiedUsersOpen(false);
    }
  }

  return (
    <ProtectedRoute>
      <AppHead />
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
          setMarkers={setMarkers}
          setIsDeletePostPopupOpen={setIsDeletePostPopupOpen}
        />
        <AddPostPopup
          setActivePost={setActivePost}
          newPost={newPost}
          setNewPost={setNewPost}
          newMarker={newMarker}
          setNewMarker={setNewMarker}
          setMarkers={setMarkers}
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
          setMarkers={setMarkers}
        />
        <Footer />
      </div>
    </ProtectedRoute>
  )
}

export default LoggedInMain;