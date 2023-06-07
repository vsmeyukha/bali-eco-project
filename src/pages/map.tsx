import { ReactElement, useState, useRef, FormEvent, ChangeEvent, useEffect } from "react";
import { GetStaticProps } from "next";

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

import { usePopper } from "react-popper";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

  // ? прописываем типизацию объекта обработки инпутов (сама логика ниже, на 63 строке), экспортируем интерфейс, чтобы использовать его в типизации пропсов addPostPopup
  export interface handlingInputs {
    values: {
      postTitle: string,
      postComment: string,
      postGeo: string,
      postImage: string | null,
    },
    handlers: {
      handlePostTitleInput: (e: ChangeEvent<HTMLInputElement>) => void,
      handlePostCommentInput: (e: ChangeEvent<HTMLInputElement>) => void,
      handlePostGeoInput: (e: ChangeEvent<HTMLInputElement>) => void,
    },
  }

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const typedLocale = locale as string;
  return {
    props: {
      ...(await serverSideTranslations(
        typedLocale,
        ['headerMenu', 'mapPage', 'chatGPT', 'addPostPopup'],
        null,
        ['en', 'ru', 'id']
      )),
    },
  }
}

const LoggedInMain: React.FC = (): ReactElement => {
  // ? считаем ширину экрана
  const viewportWidth = useViewportWidth();

  // ? логика открытия и закрытия попапа большого поста
  const [isBigPopupOpen, setIsBigPopupOpen] = useState<boolean>(false);

  const handleBigPopupOpen = (): void => {
    setIsBigPopupOpen(true);
  }

  const popupRef = useRef<HTMLDivElement | null>(null);

  const handlePopupClose = (e: React.MouseEvent): void => {
    if (isBigPopupOpen === true && popupRef.current && !popupRef.current.contains(e.target as Node)) {
      clearAllStates();
      setIsBigPopupOpen(false);
    }
  }

  // ? логика открытия и закрытия бокового поста с формой для введения данных для добавления поста
  const [isAddPostPopupOpen, setIsAddPostPopupOpen] = useState<boolean>(false);

  const handleAddPostPopupOpen = (): void => {
    setIsAddPostPopupOpen(true);
  }

  const handleAddPostPopupClose = (): void => {
    setIsAddPostPopupOpen(false);
  }

  // ? работаем с инпутами формы добавления поста
  // ? создаем отдельный стейт для каждого инпута
  const [postTitle, setPostTitle] = useState<string>('');
  const [postComment, setPostComment] = useState<string>('');
  const [postGeo, setPostGeo] = useState<string>('');
  const [postImage, setPostImage] = useState<string | null>(null)

  // ? создаем функцию, которая возвращает нам функции-хэндлеры. она принимает определенный setState
  const createInputHandler = (setX: (value: string) => void) => {
    return function (e: ChangeEvent<HTMLInputElement>) {
      setX(e.target.value);
    }
  }

  // ? создаем хэндлеры с помощью функции для создания хэндлеров
  const handlePostTitleInput = createInputHandler(setPostTitle);
  const handlePostCommentInput = createInputHandler(setPostComment);
  const handlePostGeoInput = createInputHandler(setPostGeo);

  function clearAllStates (): void {
    setPostTitle('');
    setPostComment('');
    setPostGeo('');
    setPostImage(null);
  }

  // ? создаем объект. чтобы прокидывать его дальше в форму, чтобы был один проп, а не чертова гора пропсов

  const handlingInputs: handlingInputs = {
    values: {
      postTitle,
      postComment,
      postGeo,
      postImage,
    },
    handlers: {
      handlePostTitleInput,
      handlePostCommentInput,
      handlePostGeoInput,
    },
  }

  return (
    <section className="w-full relative" onClick={handlePopupClose}>
      <Header />
      <PublishPhoto openPopup={handleAddPostPopupOpen} />
      <MapComponent handleBigPopupOpen={handleBigPopupOpen} />
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
        isBigPopupOpen={isBigPopupOpen}
        title={postTitle}
        comment={postComment}
        geo={postGeo}
        image={postImage}
        clearAllStates={clearAllStates}
      />
      <AddPostPopup
        open={isAddPostPopupOpen}
        onClose={handleAddPostPopupClose}
        handlingInputs={handlingInputs}
        setImageState={setPostImage}
        postImage={postImage}
        handleBigPopupOpen={handleBigPopupOpen}
      />
      <div className="w-full h-[500px] bg-gray-500 flex flex-col justify-center items-center">
        <div className="bg-red-500 w-[300px] h-[300px] mx-auto flex flex-col items-center hover:translate-x-full">
        </div>
      </div>
      <Footer />
    </section>
  )
}

export default LoggedInMain;