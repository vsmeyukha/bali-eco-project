import { FormEvent, ReactElement, useRef, useEffect, Dispatch, SetStateAction } from "react";
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

import { IMarker } from "../../pages/map";

import defaultImage from '../../../public/images/backgrounds/Porsche.jpg';

interface AddPostPopupProps {
  setMarkers: Dispatch<SetStateAction<IMarker[]>>
  setActiveMarker: Dispatch<SetStateAction<IMarker | null>>,
  newMarker: IMarker | null,
  setNewMarker: Dispatch<SetStateAction<IMarker | null>>
}

const photoUploadInputStyles = 'border border-solid border-[#00265F] border-opacity-10 rounded-[10px] mt-[8px] w-full h-[330px] focus:outline-none active:outline-none';

const AddPostPopup: React.FC<AddPostPopupProps> = (
  {
    setMarkers,
    setActiveMarker,
    newMarker,
    setNewMarker,
  }: AddPostPopupProps): ReactElement => {

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (newMarker !== null) {
      setActiveMarker(newMarker);

      setMarkers((prevMarkers) => {
        if (newMarker !== null) {
          const newMarkers = [...prevMarkers, newMarker];
          return newMarkers;
        } return prevMarkers;
      });
    }

    setNewMarker(null);
  }

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    event.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];

    if (file && newMarker) {
      const imageUrl = URL.createObjectURL(file);
      setNewMarker({ ...newMarker, imageUrl });
    }
  };

  const titleValidation = z.coerce.string().min(5, { message: "Must be longer than 5 symbols" });
  const commentValidation = z.coerce.string().min(10, { message: "Must be longer than 10 symbols" });

  const titleValResult = titleValidation.safeParse(newMarker?.title);
  const commentValResult = commentValidation.safeParse(newMarker?.comment);

  let titleValidationMessage = '';
  let commentValidationMessage = '';

  if (!titleValResult.success) {
    titleValidationMessage = titleValResult.error.issues[0].message;
  }

  if (!commentValResult.success) {
    commentValidationMessage = commentValResult.error.issues[0].message;
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (newMarker) {
      setNewMarker({ ...newMarker, title: event.target.value });
      if (!titleValidation.safeParse(event.target.value).success) {
        console.log(titleValidation.safeParse(newMarker?.title));
      }
    }
  }

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (newMarker) {
      setNewMarker({ ...newMarker, comment: event.target.value });
    }
  }

  // ? useEffect очищает URL хранилище каждый раз, когда изменяется imageUrl. когда мы сабмитим форму, в самом конце функции сабмита мы приводим newMarker к null, так что imageUrl изменяется. таким образом, ссылка уже сохранена в activeMarker и создан новый объект в массиве markers, также хранящий эту ссылку, однако эта ссылка ведет в пустоту. как временное решение можно просто не чистить эту штуку, посколько при перезагрузке страницы она все равно очищается браузером
  // const imageUrl = newMarker?.imageUrl;

  // useEffect(() => {
    
  //   return () => {
  //     if (imageUrl) {
  //       URL.revokeObjectURL(imageUrl);
  //     }
  //   };
  // }, [imageUrl]);

  const ifButtonisActive: boolean =
    titleValResult.success
    &&
    commentValResult.success
    &&
    Boolean(newMarker?.coordinates)
    &&
    Boolean(newMarker?.imageUrl);
  
  const { t } = useTranslation('addPostPopup');

  return (
    <SidePopup open={Boolean(newMarker)} onClose={() => setNewMarker(null)}>
      <Dialog.Title
        className="font-oceanic-bold text-[40px] leading-[48px] text-[#00265F] mb-[24px]"
      >
        {t('addPhoto')}
      </Dialog.Title>
      <Form onSubmit={handleSubmit}>
        {!newMarker?.imageUrl
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
          <img src={newMarker?.imageUrl ?? defaultImage.src} alt="abc" className="rounded-[10px]"/>
        }
        <Input
          label={t('title')}
          name="title"
          value={newMarker !== null ? newMarker.title : ''}
          handleChange={handleTitleChange}
        />
        <span className="w-full text-left text-red-500 mt-[8px]">
          {(!titleValResult.success && newMarker?.title !== '') && titleValidationMessage}
        </span>
        <TextAreaInput
          label={t('comment')}
          name="comment"
          // ? спросить, как лучше записать value - как коммент или как тайтл 
          value={newMarker?.comment ?? ''}
          handleChange={handleCommentChange}
        />
        <span className="w-full text-left text-red-500 mt-[8px]">
          {(!commentValResult.success && newMarker?.comment !== '') && commentValidationMessage}
        </span>
        <p className="font-medium text-[18px] leading-[22px] mt-[32px] self-start">{t('isItDirty')}</p>
        <div className="flex space-x-[16px] self-start mt-[16px]">
          <DirtButton smile={<SadSmile />} text={t('itIsDirty')} />
          <DirtButton smile={<CheerfulSmile />} text={t('itIsNotDirty')} />
        </div>
        <BigBlueButton size="large" type="submit" text={t('publish')} disabled={!ifButtonisActive} />
      </Form>
    </SidePopup>
  );
}

export default AddPostPopup;