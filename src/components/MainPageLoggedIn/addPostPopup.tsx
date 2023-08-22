import {
  FormEvent,
  ReactElement,
  useRef,
  Dispatch,
  SetStateAction,
  useState,
  useEffect
} from "react";

import { Dialog } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import { z } from 'zod';

import SidePopup from "../SidePopup";
import Form from "../Form/Form";
import Input from '../Form/Input';
import BigBlueButton from "../MainPageNotLoggedIn/BigBlueButton";
import BigPlus from '../../../public/images/svgs/icons/bigPlus.svg';
import TextAreaInput from "../Form/TextAreaInput";
import DirtButton from "./map/postOnMap/DirtButton";
import SadSmile from '../../../public/images/svgs/icons/sadsmile.svg';
import CheerfulSmile from '../../../public/images/svgs/icons/cheerfulsmile.svg';
import Loader from "../loaders/SmallLoader";

import { IPost, IMarker } from "../../pages/map";

import defaultImage from '../../../public/images/backgrounds/Porsche.jpg';

import { addPost } from "@/firebase/firestore";

interface AddPostPopupProps {
  setActivePost: Dispatch<SetStateAction<IPost | null>>,
  newPost: IPost | null,
  setNewPost: Dispatch<SetStateAction<IPost | null>>,
  newMarker: IMarker | null,
  setNewMarker: Dispatch<SetStateAction<IMarker | null>>,
  setMarkers: Dispatch<SetStateAction<IMarker[]>>
}

const photoUploadInputStyles = 'border border-solid border-[#00265F] border-opacity-10 rounded-[10px] mt-[8px] w-full h-[330px] focus:outline-none active:outline-none';

const titleValidation = z.coerce.string().min(5);
const commentValidation = z.coerce.string().min(10);

const AddPostPopup: React.FC<AddPostPopupProps> = (
  {
    setActivePost,
    newPost,
    setNewPost,
    newMarker,
    setNewMarker,
    setMarkers
  }: AddPostPopupProps): ReactElement => {
  
  const { t, i18n } = useTranslation('addPostPopup');

  // ? State for storing a photo uploaded by a user
  // ? Стейт для хранения фотографии, загруженной пользователем
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // ? isLoading status state to show the loader while the post is being created in firebase
  // ? Стейт состояния загрузки, чтобы показывать лоадер, пока пост создается в firebase
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // ? The `submitButtonText` state is used to display different text on the submit button based on various stages of the registration process.
  // ? Стейт текста кнопки сабмита, который меняется в зависимости от стадии процесса регистрации
  const [submitButtonText, setSubmitButtonText] = useState<string>(t('publish') || 'Post');

  // ? State of error while uploading a post to firebase
  // ? Стейт ошибки при загрузке поста
  const [errorMessage, setErrorMessage] = useState<string>('');

  // ? Since we use the state to display different text on the submit button, depending on what stage the login process is at, and the state is not overwritten when we change the language, the problem arises that when switching the language everything on the page changes, but the text on the button remains in the previous language. we solve this problem by using useEffect, which listens to the language change, which is stored in the i18n.language property and also the change of newPost

  // ? Так как мы используем стейт для отображения разного текста на кнопке сабмита в зависимости от того, в какой стадии находится процесс входа, а стейт не перезаписывается, когда мы меняем язык, то возникает проблема, что при переключении языка все на странице меняется, но текст на кнопке остается на предыдущем языке. Эту проблему мы решаем, используя useEffect, который слушает изменение языка, который хранится в свойстве i18n.language, а также изменение newPost.
  useEffect(() => {
    setSubmitButtonText(t('publish') || 'Post');
  }, [t, i18n.language, newPost]);

  // ? Submit form function
  // ? Функция сабмита формы
  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      // ? If newMarker and newPost passed to AddPostpopup component as props are not equal to null and also selectedFile state is not null (which means that the file was uploaded to the oage from user's device), then:

      // ? Если переданные пропсами newMarker и newPost не равны null, а также selectedFile не равен null (то есть файл загружен с устройства пользователя), то:
      if (newMarker !== null && newPost !== null && selectedFile !== null) {

        // ? Setting submitButtonText state to 'Loading' to show this text on the button while the post is being created for better UI.
        // ? Устанавливаем стейт текста на кнопке в 'Loading', чтобы на кнопке отображалась информация о том, что пост загружается. Так мы улучшаем UI.
        setSubmitButtonText(t('loading') || 'Loading');

        // ? Setting isLoading state to true to show the loader while the post is being created in firebase.
        // ? Устанавливаем стейт isLoading в true, чтобы отображался лоадер, пока создается пост в firebase.
        setIsLoading(true);

        // ? Uploading post to firebase passing to addPost function three args: marker, post and photo file. Also we get post id from firebase.
        // ? загружаем пост в firebase, передав функции запроса к базе данных три аргумента: маркер, пост и файл фотографии. Получаем айдишник поста из firebase.
        const markerId = await addPost(newMarker, newPost, selectedFile);

        // ? Setting submitButtonText state to 'Success!'
        // ? устанавливаем стейт submitButtonText в 'Success!'
        setSubmitButtonText(t('success') || 'Success!');

        // ? Setting isLoading state to false for not showing the loader anymore.
        // ? Устанавливаем стейт isLoading в false, чтобы лоадер больше не отображался.
        setIsLoading(false);

        // ? Erasing uploaded photo from selectedFile state.
        // ? Убираем загруженное фото из стейта.
        setSelectedFile(null);

        // ? Setting activePost state to newPost with all the added fields.
        // ? Присваиваем стейту activePost newPost со всеми добавленными полями.
        setActivePost(newPost);

        // ? Adding newMarker to markers state for it to appear on the map.
        // ? Добавляем новый маркер в стейт всех маркеров, чтобы он отображался на карте.
        setMarkers((prevCoordinates) => {
          if (newMarker !== null) {
            const newCoordinates = [...prevCoordinates, {...newMarker, id: markerId}];
            return newCoordinates;
          } return prevCoordinates;
        });

        // ? Setting newMarker state to null to close addPostPopup.
        // ? Устанавливаем стейт newMarker в null, тем самым закрываем сайдбар добавления поста.
        setNewMarker(null);

        // ? Setting newPost state to null.
        // ? Устанавливаем стейт newPost в null.
        setNewPost(null);

        // ? Setting errorMessage state to an empty string.
        // ? Приводим стейт errorMessage к пустой строке.
        setErrorMessage('');
      }
    } catch (error: any) {
      // ? In case of error while uploading a new post show localized error text or fallback error text.
      // ? В случае ошибки при добавлении нового поста показываем локализованный текст ошибки или дефолтный текст ошибки.
      setErrorMessage(t('uploadPostError') || 'Error while uploading post! Please try again.');
    }
  }

  // ? Creating a ref on the file upload input. This is necessary in order to be able to hide the input itself, because an input with the 'file' type cannot be customized by design, and create a custom element that simulates the file upload input.

  // ? Создаем реф на инпут загрузки файла. Это нужно для того, чтобы иметь возможность скрыть сам инпут, потому что инпут с типом 'file' нельзя кастомизировать по дизайну, и нарисовать кастомный элемент, который имитирует инпут загрузки файла. 
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ? The method that we pass to the button that simulates the input of the file download. First we stop the default action. If there is a ref to a real input, then we initiate a click on it.

  // ? Метод, который мы вешаем на кнопку, которая имитирует инпут загрузки файла. Останавливаем действие по умолчанию. Если есть реф на настоящий инпут, то инициируем клик по нему.
  const handleFileUpload = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    event.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // ? We pass this method to the file upload input itself. We take the first downloaded file from event.target.files. If there is a file and a newPost has been passed to AddPostPopup component props, then we add the file to the selectedFile state.

  // ? Этот метод мы вешаем на сам инпут загрузки файла. Берем первый загруженный файл из event.target.files. Если есть file и пропсами пришел newPost, то складываем файл в стейт selectedFile. 
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];

    if (file && newPost) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setNewPost({ ...newPost, imageUrl });
    }
  };

  // ? Form fields validation
  // ? Валидация полей формы
  const titleValResult = titleValidation.safeParse(newPost?.title);
  const commentValResult = commentValidation.safeParse(newPost?.comment);

  // ? Form handler. If newPost has been passed as a prop, then we write in its corresponding fields the values that the user entered into the input.

  // ? Хэндлер формы. Если пропсами пришел newPost, то записываем в его соответствующие поля значения, которые пользователь ввел в инпут. 
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (newPost) {
      setNewPost({ ...newPost, [e.target.name]: e.target.value });
    }
  }

  // const imageUrl = newPost?.imageUrl;

  // useEffect(() => {
    
  //   return () => {
  //     if (imageUrl) {
  //       URL.revokeObjectURL(imageUrl);
  //     }
  //   };
  // }, [imageUrl]);

  // ? Submit button is active when all the text fields have passed validation, newMarker exists and photo URL has been saved to newPost.

  // ? Кнопка сабмита формы активна, когда все текстовые поля валидны, есть newMarker и в newPost сохранен урл фотографии.
  const ifButtonisActive: boolean =
    titleValResult.success
    &&
    commentValResult.success
    &&
    Boolean(newMarker)
    &&
    Boolean(newPost?.imageUrl);

  return (
    <SidePopup open={Boolean(newMarker)} onClose={() => setNewMarker(null)}>
      <Dialog.Title
        className="font-oceanic-bold text-[40px] leading-[48px] text-[#00265F] mb-[24px]"
      >
        {t('addPhoto')}
      </Dialog.Title>
      <Form onSubmit={handleSubmit}>
        {!newPost?.imageUrl
          ?
          <>
            <input
              type="file"
              name="photo"
              accept=".jpg, .jpeg, .png, .webp"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <button onClick={handleFileUpload} className={`${photoUploadInputStyles} flex flex-col items-center`}>
              <BigPlus className="mt-[116px] mb-[23px] hover:scale-110 transition-transform duration-200" />
              <p className="font-medium text-[18px] leading-[22px] hover:scale-105 transition-transform duration-200">
                {t('dragOrDrop')}
              </p>
            </button>
          </>
          :
          <img src={newPost?.imageUrl ?? defaultImage.src} alt="abc" className="rounded-[10px]"/>
        }
        <Input
          label={t('title')}
          name="title"
          value={newPost !== null ? newPost.title : ''}
          handleChange={handleFormChange}
          valSuccess={titleValResult.success}
          valErrorMessage={t('titleValidation')}
        />
        <TextAreaInput
          label={t('comment')}
          name="comment"
          value={newPost?.comment ?? ''}
          handleChange={handleFormChange}
          valSuccess={commentValResult.success}
          valErrorMessage={t('commentValidation')}
        />
        { /* пока нереализованная логика добавления "лайков" - отметок "грязно" / "не грязно" */}
        {/* <p className="font-medium text-[18px] leading-[22px] mt-[32px] self-start">{t('isItDirty')}</p>
        <div className="flex space-x-[16px] self-start mt-[16px]">
          <DirtButton smile={<SadSmile />} text={t('itIsDirty')} />
          <DirtButton smile={<CheerfulSmile />} text={t('itIsNotDirty')} />
        </div> */}
        <span className="w-full text-left text-red-500 mt-[40px]">
          {errorMessage} 
        </span>
        <BigBlueButton size="large" type="submit" text={submitButtonText} disabled={!ifButtonisActive}>
          {isLoading && <Loader />}
        </BigBlueButton>
      </Form>
    </SidePopup>
  );
}

export default AddPostPopup;