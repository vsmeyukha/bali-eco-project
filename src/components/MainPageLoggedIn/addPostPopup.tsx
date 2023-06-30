import { FormEvent, ReactElement, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { Dialog } from "@headlessui/react";
import { useTranslation } from "next-i18next";
const exifParser = require('exif-parser');

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

import { IMarker } from "../../pages/map";

import defaultImage from '../../../public/images/backgrounds/Porsche.jpg';

interface AddPostPopupProps {
  open: boolean,
  onClose: () => void,
  handlingInputs: handlingInputs,
  setImageState: Dispatch<React.SetStateAction<string | null>>,
  postImage: string | null,
  handleBigPopupOpen: () => void,
  setMarkers: Dispatch<SetStateAction<IMarker[]>>
  setActiveMarker: Dispatch<SetStateAction<IMarker | null>>,
  markers: IMarker[],
  newMarker: IMarker | null,
  setNewMarker: Dispatch<SetStateAction<IMarker | null>>
}

const photoUploadInputStyles = 'border border-solid border-[#00265F] border-opacity-10 rounded-[10px] mt-[8px] w-full h-[330px] focus:outline-none active:outline-none';

const AddPostPopup: React.FC<AddPostPopupProps> = (
  {
    open,
    onClose,
    handlingInputs,
    setImageState,
    postImage,
    handleBigPopupOpen,
    markers,
    setMarkers,
    setActiveMarker,
    newMarker,
    setNewMarker,
  }: AddPostPopupProps): ReactElement => {
  
  const lastMarker: IMarker = markers[markers.length - 1];

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

    if (file && newMarker) {
      const imageUrl = URL.createObjectURL(file);

      setNewMarker({ ...newMarker, imageUrl });
      
      // setMarkers((prevMarkers: IMarker[]) => {
      //   if (prevMarkers.length !== 0) {
      //     const newMarkers = prevMarkers.slice(0, -1);
      //     const lastMarker = prevMarkers[prevMarkers.length - 1];
      //     return [...newMarkers, { ...lastMarker, imageUrl }];
      //   } else {
      //     return prevMarkers;
      //   }
      // })
    }
  };

const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
  if (newMarker) {
    setNewMarker({ ...newMarker, title: event.target.value });
  }

  // setMarkers((prevMarkers: IMarker[]) => {
  //   if (prevMarkers.length !== 0) {
  //     const newMarkers = prevMarkers.slice(0, -1);
  //     const lastMarker = prevMarkers[prevMarkers.length - 1];
  //     return [...newMarkers, { ...lastMarker, title: event.target.value }];
  //   } else {
  //     return prevMarkers;
  //     }
  //   })
}
  
  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (newMarker) {
      setNewMarker({ ...newMarker, comment: event.target.value });
    }

    // setMarkers((prevMarkers: IMarker[]) => {
    //   if (prevMarkers.length !== 0) {
    //     const newMarkers = prevMarkers.slice(0, -1);
    //     const lastMarker = prevMarkers[prevMarkers.length - 1];
    //     return [...newMarkers, { ...lastMarker, comment: event.target.value }];
    //   }
    //   else {
    //     return prevMarkers;
    //   }
    // })
  }

  // ? это вариант функции с exif-parser
  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
  //   const file = event.target.files?.[0];

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = function (event) {
  //       // ? событие onloadend триггерится reader, так что event.target синонимично reader
  //       if (event.target && reader.readyState === FileReader.DONE) {
  //         const arrayBuffer = new Uint8Array(event.target.result as ArrayBuffer);
  //         const parser = exifParser.create(arrayBuffer.buffer);
  //         const result = parser.parse();
  //         console.log(result.tags);
  //       }
  //     }

  //     reader.onerror = function () {
  //       console.error("An error occurred while reading the file.");
  //     };

  //     reader.readAsArrayBuffer(file);

  //     const imageUrl = URL.createObjectURL(file);
  //     setImageState(imageUrl);
  //   }
  // };

  // ? если раскомментировать в таком виде, изображение не сохраняется, разобраться 
  // const imageUrl = newMarker?.imageUrl;

  // useEffect(() => {
    
  //   return () => {
  //     if (imageUrl) {
  //       URL.revokeObjectURL(imageUrl);
  //     }
  //   };
  // }, [imageUrl]);

  const ifButtonisActive: boolean =
    Boolean(newMarker?.title)
    &&
    Boolean(newMarker?.comment)
    &&
    Boolean(newMarker?.coordinates)
    &&
    Boolean(newMarker?.imageUrl);
  
  const { t } = useTranslation('addPostPopup');

  return (
    <SidePopup open={open} onClose={onClose}>
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
        <TextAreaInput
          label={t('comment')}
          name="comment"
          value={newMarker !== null ? newMarker.comment : ''}
          handleChange={handleCommentChange}
        />
        <p className="mt-[24px]">{newMarker !== null && `Location: ${newMarker.coordinates.lat}, ${newMarker.coordinates.lng}`}</p>
        {/* <Input
          label={t('geo')}
          name="geo"
          value={`${handlingInputs.values.postGeo.lat}, ${handlingInputs.values.postGeo.lng}`}
        /> */}
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


