import { ReactElement, useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import ChevronDown from '../../../public/images/svgs/icons/arrow-down.svg';

const LanguageChoice: React.FC = (): ReactElement => {
  const langs = [
    'Русский (RU)',
    'English (EN)',
    'Indonesia (ID)',
  ];

  const [selectedLang, setSelectedLang] = useState(langs[0]);

  return (
    <Listbox value={selectedLang} onChange={setSelectedLang}>
    <Listbox.Button className='flex flex-row items-center'>
      <p>{selectedLang}</p>
      <ChevronDown className="ml-[11px]" />
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
    <Listbox.Options className="absolute top-[30px] right-0">
      {langs.map((lang, index) => {
        return (
          <Listbox.Option key={index} value={lang} className="my-[10px]">
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