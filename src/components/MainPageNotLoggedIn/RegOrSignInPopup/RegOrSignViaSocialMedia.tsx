import { ReactElement } from 'react';
import { useTranslation } from 'next-i18next';

import Apple from '../../../../public/images/svgs/icons/apple.svg';
import Google from '../../../../public/images/svgs/icons/google.svg';
import { buttonStyles } from "@/utils/styles";
import { RegSignInPopup } from '../../../utils/types'

interface RegOrSignViaSocialMediaProps {
  regOrSign: RegSignInPopup,
  isRegPopup: boolean,
}

const RegOrSignViaSocialMedia: React.FC<RegOrSignViaSocialMediaProps> = ({ regOrSign, isRegPopup }): ReactElement => {
  const { t } = useTranslation(['registerPopup', 'signInPopup']);

  return (
    <div className="mt-[24px] w-full flex flex-col items-center">
      <button className={buttonStyles}>
        <Apple style={{ fill: "#00265F" }} className="h-[20px] w-[17px]" />
        <p className="ml-[10px]">{
          isRegPopup
            ?
            t('registerWithApple')
            :
            t('signInPopup:signInWithApple')
        }</p>
      </button>
      <button className={buttonStyles}>
        <Google style={{ fill: "#00265F" }} className="h-[21px] w-[21px]" />
        <p className="ml-[10px]">{
          isRegPopup
            ?
            t('registerWithGoogle')
            :
            t('signInPopup:signInWithGoogle')
        }</p>
      </button>
    </div>
  );
}

export default RegOrSignViaSocialMedia;