import { ReactElement } from 'react';
import Fb from '../../public/images/svgs/icons/fb.svg';
import Inst from '../../public/images/svgs/icons/inst.svg';
import Twitter from '../../public/images/svgs/icons/twitter.svg';

const InstTwiFb: React.FC<{fill: string}>= ({fill}): ReactElement => {
  return (
    <div className="flex flex-row items-center">
      <Inst style={{ fill: fill }} />
      <Twitter className="ml-[32px]" style={{ fill: fill }}/>
      <Fb className="max-h-[20px] ml-[32px]" style={{ fill: fill }} />
    </div>
  )
}

export default InstTwiFb;