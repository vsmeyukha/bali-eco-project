import { ReactElement } from "react";
import { useTranslation } from 'next-i18next';

import { popupStateType } from '@/pages';

interface SwitchPopupsPropsType {
  popup: popupStateType,
  handleSwitchPopups: () => void,
}

// ? Component for switching between registration and sign-in popups.
// ? Компонент для переключения между попапами регистрации и входа.

const SwitchPopups: React.FC<SwitchPopupsPropsType> = ({ popup, handleSwitchPopups }: SwitchPopupsPropsType): ReactElement => {
  const { t } = useTranslation(['registerPopup', 'signInPopup']);

  return (
    <div className='flex flex-col items-start'>
      <p className="text-[#00265F]">{ popup === 'regPopup' ? t('alreadyRegistered') : t('signInPopup:notRegisteredYet')}</p>
      <button onClick={handleSwitchPopups} type="button" className="text-[#0D87FF] mt-[8px]">
        <a>
          {popup === 'regPopup' ? t('signIn') : t('signInPopup:register')}
        </a>
      </button>
    </div>
  );
}

export default SwitchPopups;