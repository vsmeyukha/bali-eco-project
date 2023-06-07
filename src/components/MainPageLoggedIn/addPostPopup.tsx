import { FormEvent, ReactElement, useRef, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { useTranslation } from "next-i18next";

import SidePopup from "../SidePopup";
import Form from "../Form/Form";
import Input from '../Form/Input';
import BigBlueButton from "../MainPageNotLoggedIn/BigBlueButton";
import BigPlus from '../../../public/images/svgs/icons/bigPlus.svg';
import TextAreaInput from "../Form/TextAreaInput";
import DirtButton from "./map/postOnMap/DirtButton";
import SadSmile from '../../../public/images/svgs/icons/sadsmile.svg';
import CheerfulSmile from '../../../public/images/svgs/icons/cheerfulsmile.svg';

import { handlingInputs } from '../../pages/map';

interface AddPostPopupProps {
  open: boolean,
  onClose: () => void,
  handlingInputs: handlingInputs,
  setImageState: React.Dispatch<React.SetStateAction<string | null>>,
  postImage: string | null,
  handleBigPopupOpen: () => void,
}

const photoUploadInputStyles = 'border border-solid border-[#00265F] border-opacity-10 rounded-[10px] mt-[8px] w-full h-[330px] focus:outline-none active:outline-none';

const AddPostPopup: React.FC<AddPostPopupProps> = ({
  open,
  onClose,
  handlingInputs,
  setImageState,
  postImage,
  handleBigPopupOpen}: AddPostPopupProps): ReactElement => {

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onClose();
    handleBigPopupOpen();
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
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageState(imageUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (postImage) {
        URL.revokeObjectURL(postImage);
      }
    };
  }, [postImage]);

  const ifButtonisActive: boolean =
    Boolean(handlingInputs.values.postTitle)
    &&
    Boolean(handlingInputs.values.postComment)
    &&
    Boolean(handlingInputs.values.postGeo)
    &&
    Boolean(handlingInputs.values.postImage);
  
  const { t } = useTranslation('addPostPopup');

  return (
    <SidePopup open={open} onClose={onClose}>
      <Dialog.Title className="font-oceanic-bold text-[40px] leading-[48px] text-[#00265F] mb-[24px]">{ t('addPhoto') }</Dialog.Title>
      <Form onSubmit={handleSubmit}>
        {!postImage
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
          <img src={postImage} className="rounded-[10px]"/>
        }
        <Input
          label={t('title')}
          name="title"
          value={handlingInputs.values.postTitle}
          handleChange={handlingInputs.handlers.handlePostTitleInput}
        />
        <TextAreaInput
          label={t('comment')}
          name="comment"
          value={handlingInputs.values.postComment}
          handleChange={handlingInputs.handlers.handlePostCommentInput}
        />
        <Input
          label={t('geo')}
          name="geo"
          value={handlingInputs.values.postGeo}
          handleChange={handlingInputs.handlers.handlePostGeoInput}
        />
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