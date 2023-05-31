import { FormEvent, ReactElement, useRef } from "react";
import { Dialog } from "@headlessui/react";
import SidePopup from "../SidePopup";
import Form from "../Form/Form";
import Input from '../Form/Input';
import BigBlueButton from "../MainPageNotLoggedIn/BigBlueButton";
import BigPlus from '../../../public/images/svgs/icons/bigPlus.svg';
import TextAreaInput from "../Form/TextAreaInput";
import DirtButton from "./map/postOnMap/DirtButton";
import SadSmile from '../../../public/images/svgs/icons/sadsmile.svg';
import CheerfulSmile from '../../../public/images/svgs/icons/cheerfulsmile.svg';

interface AddPostPopupProps {
  open: boolean,
  onClose: () => void,
}

const photoUploadInputStyles = 'border border-solid border-[#00265F] border-opacity-10 rounded-[10px] mt-[8px] w-full h-[330px] focus:outline-none active:outline-none';

const AddPostPopup: React.FC<AddPostPopupProps> = ({ open, onClose }: AddPostPopupProps): ReactElement => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onClose();
  }

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      console.log(file);
      // Do something with the selected file...
    }
  };

  return (
    <SidePopup open={open} onClose={onClose}>
      <Dialog.Title className="font-oceanic-bold text-[40px] leading-[48px] text-[#00265F] mb-[24px]">Добавить фото</Dialog.Title>
      <Form onSubmit={handleSubmit}>
        <input type="file" style={{ display: "none" }} ref={fileInputRef} onChange={handleFileChange} />
        <button onClick={handleFileUpload} className={`${photoUploadInputStyles} flex flex-col items-center`}>
          <BigPlus className="mt-[116px] mb-[23px] hover:scale-110 transition-transform duration-200" />
          <p className="font-medium text-[18px] leading-[22px] hover:scale-105 transition-transform duration-200">Добавьте или перетащите файл сюда</p>
        </button>
        <Input label="Заголовок" name="title" />
        <TextAreaInput label="Комментарий к фото" name="comment" />
        <Input label="Геолокация" name="geo" />
        <p className="font-medium text-[18px] leading-[22px] mt-[32px] self-start">Грязно?</p>
        <div className="flex space-x-[16px] self-start mt-[16px]">
          <DirtButton smile={<SadSmile />} text="Да" />
          <DirtButton smile={<CheerfulSmile />} text="Нет" />
        </div>
        <BigBlueButton size="large" type="submit" text="Опубликовать" />
      </Form>
    </SidePopup>
  );
}

export default AddPostPopup;