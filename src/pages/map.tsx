import { ReactElement, useState, useRef, ChangeEvent, useEffect } from "react";
import { GetStaticProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

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

import { Coordinates, CoordsConvertedToPixels } from "@/components/MainPageLoggedIn/map/GoogleMaps";

// ? прописываем типизацию объекта обработки инпутов (сама логика ниже, на 63 строке), экспортируем интерфейс, чтобы использовать его в типизации пропсов addPostPopup
export interface handlingInputs {
  values: {
    postTitle: string,
    postComment: string,
    postGeo: Coordinates,
    postImage: string | null,
  },
  handlers: {
    handlePostTitleInput: (e: ChangeEvent<HTMLInputElement>) => void,
    handlePostCommentInput: (e: ChangeEvent<HTMLInputElement>) => void,
    handlePostGeoInput?: (e: ChangeEvent<HTMLInputElement>) => void,
  },
}

export interface IMarker {
  coordinates: Coordinates,
  coordsToPixels: CoordsConvertedToPixels,
  title: string,
  comment: string,
  imageUrl: string | null,
  // comments: number,
  // isItDirtyMarks: number
}

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
  }, []);

  // ? считаем ширину экрана
  const viewportWidth = useViewportWidth();

  // ? стейт маркеров
  const [markers, setMarkers] = useState<IMarker[]>([]);

  // ? стейт активного маркера
  const [activeMarker, setActiveMarker] = useState<IMarker | null>(null);

  // ? логика открытия и закрытия попапа большого поста
  const [isBigPopupOpen, setIsBigPopupOpen] = useState<boolean>(false);

  const handleBigPopupOpen = (): void => {
    setIsBigPopupOpen(true);
  }

  const popupRef = useRef<HTMLDivElement | null>(null);

  const handlePopupClose = (e: React.MouseEvent): void => {
    if (Boolean(activeMarker) && popupRef.current && !popupRef.current.contains(e.target as Node)) {
      setActiveMarker(null);
    }
  }

  // ? логика открытия и закрытия бокового поста с формой для введения данных для добавления поста
  const [isAddPostPopupOpen, setIsAddPostPopupOpen] = useState<boolean>(false);

  const handleAddPostPopupOpen = (): void => {
    if (!activeMarker) {
      setIsAddPostPopupOpen(true);
    }
  }

  const handleAddPostPopupClose = (): void => {
    // clearAllStates();
    setMarkers((prevMarkers: IMarker[]) => {
      const newArr = prevMarkers.slice(0, -1);
      return newArr;
    })
    setIsAddPostPopupOpen(false);
  }

  // ? работаем с инпутами формы добавления поста
  // ? создаем отдельный стейт для каждого инпута
  const [postTitle, setPostTitle] = useState<string>('');
  const [postComment, setPostComment] = useState<string>('');
  const [postGeo, setPostGeo] = useState<Coordinates>({lat: 0, lng: 0});
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
  // const handlePostGeoInput = createInputHandler(setPostGeo);

  function clearAllStates (): void {
    setPostTitle('');
    setPostComment('');
    setPostGeo({lat: 0, lng: 0});
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
    },
  }

  return (
    <section className="w-full relative" onClick={handlePopupClose}>
      <Header />
      {viewportWidth > 640 && <PublishPhoto openPopup={handleAddPostPopupOpen} />}
      <MapComponent
        handleBigPopupOpen={handleBigPopupOpen}
        setPostGeo={setPostGeo}
        handleAddPostPopupOpen={handleAddPostPopupOpen}
        markers={markers}
        setMarkers={setMarkers}
        activeMarker={activeMarker}
        setActiveMarker={setActiveMarker}
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
        isBigPopupOpen={isBigPopupOpen}
        title={postTitle}
        comment={postComment}
        image={postImage}
        clearAllStates={clearAllStates}
        activeMarker={activeMarker}
      />
      <AddPostPopup
        open={isAddPostPopupOpen}
        onClose={handleAddPostPopupClose}
        handlingInputs={handlingInputs}
        setImageState={setPostImage}
        postImage={postImage}
        handleBigPopupOpen={handleBigPopupOpen}
        setMarkers={setMarkers}
        setActiveMarker={setActiveMarker}
        markers={markers}
      />
      <Footer />
    </section>
  )
}

export default LoggedInMain;