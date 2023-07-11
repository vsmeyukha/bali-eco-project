import { ReactElement } from 'react';
import { useTranslation } from 'next-i18next';

import Apple from '../../../../public/images/svgs/icons/apple.svg';
import Google from '../../../../public/images/svgs/icons/google.svg';
import { buttonStyles } from "@/utils/styles";
import { RegSignInPopup } from '../../../utils/types'

import { signUpWithGoogle } from '@/firebase/auth';

import { popupStateType } from '@/pages';

interface RegOrSignViaSocialMediaProps {
  popup: popupStateType,
  onClose: () => void,
}

const RegOrSignViaSocialMedia: React.FC<RegOrSignViaSocialMediaProps> = ({ popup, onClose }): ReactElement => {
  const { t } = useTranslation(['registerPopup', 'signInPopup']);

  const handleGoogleSignIn = () => {
    signUpWithGoogle();
    onClose();
  }

  return (
    <div className="mt-[24px] w-full flex flex-col items-center">
      <button className={buttonStyles}>
        <Apple style={{ fill: "#00265F" }} className="h-[20px] w-[17px]" />
        <p className="ml-[10px]">{
          popup === 'regPopup'
            ?
            t('registerWithApple')
            :
            t('signInPopup:signInWithApple')
        }</p>
      </button>
      <button className={buttonStyles} onClick={handleGoogleSignIn} type="button">
        <Google style={{ fill: "#00265F" }} className="h-[21px] w-[21px]" />
        <p className="ml-[10px]">{
          popup === 'regPopup'
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