import { ReactElement, Fragment } from "react";
import { useTranslation } from 'next-i18next';

import { Listbox, Transition } from "@headlessui/react";
import ChevronDown from '../../../../public/images/svgs/icons/arrow-down.svg';

import { switchContent } from "@/utils/types";

const LanguageChoice: React.FC = (): ReactElement => {
  const languages: Array<switchContent> = [
    { code: 'en', label: 'English (EN)' },
    { code: 'ru', label: 'Русский (RU)' },
    { code: 'id', label: 'Indonesia (ID)' },
  ];

  const { i18n } = useTranslation();

  const switchLanguages = async (langCode: string): Promise<void> => {
    await i18n.changeLanguage(langCode);
    localStorage.setItem('language', langCode);
    console.log(localStorage.getItem('language'));
  }

  return (
    <Listbox value={i18n.language} onChange={switchLanguages}>
    <Listbox.Button className='flex flex-col items-end'>
      <p className="text-right">{languages.find(language => language.code === i18n.language)?.label}</p>
      <ChevronDown className="mt-[8px]" />
    </Listbox.Button>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1"
    >
    <Listbox.Options className="absolute top-[35px] right-0 focus:outline-none active:outline-none">
      {languages.map((lang, index) => {
        return (
          <Listbox.Option
            key={index}
            value={lang.code}
            className={({ active }) => `my-[10px] hover:cursor-pointer ${active && "text-[#0D87FF]"}`}
          >
            <p>{lang.label}</p>
          </Listbox.Option>
        )
      })}
      </Listbox.Options>
    </ Transition>
  </Listbox>
  );
}

export default LanguageChoice;
