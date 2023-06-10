import { ReactElement, Fragment } from "react";
import { useTranslation } from "next-i18next";
import { switchContent } from "@/utils/types";
import QuickPopupSwitchButton from "./QuickPopupSwitchButton";

interface QuickPopupSwitchContainerProps {
  selectedLang: string,
  handleSetSelectedLang: (code: string) => void,
}

const SwitchLanguage: React.FC = (): ReactElement => {
  const languages: Array<switchContent> = [
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
    { code: 'id', label: 'ID' },
  ];

  const { i18n } = useTranslation();

  const switchLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    console.log(i18n);
    console.log(i18n.language);
    console.log(typeof i18n.language);
    console.log(i18n.hasResourceBundle(lng, 'common'));
  }

  const handleSelected = (code: string): void => {
    switchLanguage(code);
  }

  return (
    <>
      {languages.map((lang, index, arr) => {
        return (
          <Fragment key={lang.code}>
            <QuickPopupSwitchButton
              code={lang.code}
              text={lang.label}
              isSelected={i18n.language === lang.code}
              onClick={handleSelected}
            />
            {
              i18n.language !== lang.code
              &&
              i18n.language !== arr[index + 1]?.code
              &&
              index !== arr.length - 1
              &&
              (<div className="h-[16px] border-[#3C3C43] border-opacity-40 border-[0.5px]"></div>)
            }
          </Fragment>
        )
        })
      }
    </>
  )
}

export default SwitchLanguage;
