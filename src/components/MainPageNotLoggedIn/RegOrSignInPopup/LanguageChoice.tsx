import { ReactElement, Fragment } from "react";
import { useTranslation } from 'next-i18next';
import { Listbox, Transition } from "@headlessui/react";

import ChevronDown from '../../../../public/images/svgs/icons/arrow-down.svg';

import { switchContent } from "@/utils/types";

// ? Component for choosing the interface language.
// ? Компонент для выбора языка интерфейса.

const LanguageChoice: React.FC = (): ReactElement => {

  // ? An array of available languages for the interface switch.
  // ? Each element of the array is an object that contains a language code (`code`) and its textual representation (`label`).

  // ? Массив доступных языков для переключения интерфейса.
  // ? Каждый элемент массива представляет собой объект, содержащий код языка (`code`) и его текстовое представление (`label`).

  const languages: Array<switchContent> = [
    { code: 'en', label: 'English (EN)' },
    { code: 'ru', label: 'Русский (RU)' },
    { code: 'id', label: 'Indonesia (ID)' },
  ];

  const { i18n } = useTranslation();

  // ? Function to switch languages.

  // ? Switches the interface language to the one selected by the user and saves it to local storage.
  // ? The function takes a language code (`langCode`) as an argument and then switches the current interface language to the selected one, passing the lang code to changeLanguage method of i18n object from next-i18next liibrary that is in charge of internationalization in the app.
  // ? After changing the language, the user's choice is saved in the local storage (localStorage). This ensures that the last selected language is set automatically when the user revisits the site.

  // ? Функция для переключения языков.

  // ? Переключает язык интерфейса на выбранный пользователем и сохраняет его в localStorage.
  // ? Функция принимает код языка (`langCode`), затем изменяет текущий язык интерфейса на выбранный, передавая крод языка в метод changeLanguage объекта i18n из библиотеки next-i18next, которая отвечает за интернационализацию в приложении.
  // ? После изменения языка выбор пользователя сохраняется в localStorage.
  // ? Это позволяет при следующем входе на сайт автоматически устанавливать последний выбранный пользователем язык.

  const switchLanguages = async (langCode: string): Promise<void> => {
    await i18n.changeLanguage(langCode);
    localStorage.setItem('language', langCode);
  }

  return (
    <Listbox value={i18n.language} onChange={switchLanguages}>
      <Listbox.Button className='flex flex-col items-end'>
      {/*
      Searches for the current interface language in the `languages` array and displays its textual representation. Current interface language is the language stored in the 'language' prop of i18n object.
      Ищем текущий язык интерфейса в массиве `languages` и отображаем его текстовое представление. Текущий язык - это тот язык, что хранится в свойстве 'language' объекта i18n.
       */}
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
      {
        // ? For each language in the `languages` array, a language choice element is created.
        // ? When the user selects a particular language, it becomes active, and its text color changes.
        
        // ? Для каждого языка из массива `languages` создаётся элемент выбора языка.
        // ? Когда пользователь выбирает определенный язык, этот язык становится активным, и его цвет текста меняется на [#0D87FF].
        languages.map((lang, index) => {
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
