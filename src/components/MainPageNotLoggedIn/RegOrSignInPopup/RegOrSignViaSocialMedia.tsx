import { ReactElement } from 'react';
import Apple from '../../../../public/images/svgs/icons/apple.svg';
import Google from '../../../../public/images/svgs/icons/google.svg';
import { buttonStyles } from "@/utils/styles";
import {RegSignInPopup} from '../../../utils/types'

const RegOrSignViaSocialMedia: React.FC<{regOrSign: RegSignInPopup}> = ({regOrSign}): ReactElement => {
  return (
    <div className="mt-[24px]">
      <button className={buttonStyles}>
        <Apple style={{ fill: "#00265F" }} className="h-[20px] w-[17px]" />
        <p className="ml-[10px]">{regOrSign.appleText}</p>
      </button>
      <button className={buttonStyles}>
        <Google style={{ fill: "#00265F" }} className="h-[21px] w-[21px]" />
        <p className="ml-[10px]">{regOrSign.googleText}</p>
      </button>
    </div>
  );
}

export default RegOrSignViaSocialMedia;