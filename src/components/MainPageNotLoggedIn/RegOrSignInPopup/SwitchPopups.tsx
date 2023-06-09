import { ReactElement } from "react";
import { useTranslation } from 'next-i18next';

interface SwitchPopupsPropsType {
  isRegPopup: boolean
  handleSwitchPopups: () => void,
}

const SwitchPopups: React.FC<SwitchPopupsPropsType> = ({ isRegPopup, handleSwitchPopups }: SwitchPopupsPropsType): ReactElement => {
  const { t } = useTranslation(['registerPopup', 'signInPopup']);

  return (
    <div className='flex flex-col items-start'>
      <p className="text-[#00265F]">{ isRegPopup ? t('alreadyRegistered') : t('signInPopup:notRegisteredYet')}</p>
      <button onClick={handleSwitchPopups} type="button" className="text-[#0D87FF] mt-[8px]"><a>{ isRegPopup ? t('signIn') : t('signInPopup:register')}</a></button>
    </div>
  );
}

export default SwitchPopups;