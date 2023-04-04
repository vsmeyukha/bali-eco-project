import { ReactElement } from "react";
import Link from "next/link";
import LogoImage from '../../public/images/svgs/white-logo.svg';

const Logo: React.FC = (): ReactElement => {
  return (
    <Link href='/'>
      <div className="flex flex-row items-center">
        <div className="flex flex-col items-center">
          <p className="max-w-[84px] text-[14px] leading-[17px] text-center font-oceanic-light">BALI</p>
          <p className="max-w-[84px] text-[14px] leading-[17px] text-center font-oceanic-light">GREEN MAP</p>
        </div>
        <LogoImage />
      </div>
    </Link>
  );
}

export default Logo;