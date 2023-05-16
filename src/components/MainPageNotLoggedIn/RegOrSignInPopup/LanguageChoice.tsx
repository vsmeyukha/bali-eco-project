import { ReactElement, useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import ChevronDown from '../../../../public/images/svgs/icons/arrow-down.svg';

const LanguageChoice: React.FC = (): ReactElement => {
  const langs: Array<string> = [
    'Русский (RU)',
    'English (EN)',
    'Indonesia (ID)',
  ];

  const [selectedLang, setSelectedLang] = useState(langs[0]);

  return (
    <Listbox value={selectedLang} onChange={setSelectedLang}>
    <Listbox.Button className='flex flex-col items-end'>
      <p className="text-right">{selectedLang}</p>
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
      {langs.map((lang, index) => {
        return (
          <Listbox.Option key={index} value={lang} className={({active}) => `my-[10px] hover:cursor-pointer ${active && "text-[#0D87FF]"}`}>
            <p>{lang}</p>
          </Listbox.Option>
        )
      })}
      </Listbox.Options>
    </ Transition>
  </Listbox>
  );
}

export default LanguageChoice;