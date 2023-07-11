import { ReactElement } from "react";
import Link from "next/link";

import { QuickToolsMenuType } from '../../utils/types';

const QuickToolsMenuItem: React.FC<QuickToolsMenuType> = (
  {
    icon: Icon,
    href,
    titleKey,
    children,
    isSwitch = false,
    isButton,
    onButtonClick
  }): ReactElement => {
  
  const content =
    (<>
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-row">
          <Icon className="text-[#00265F] group-hover:text-[#0D87FF] transition-colors duration-300" />
          <p className="ml-[20px] font-montserrat text-[16px] leading-[20px] text-[#00265F] group-hover:text-[#0D87FF] transition-colors duration-300">{titleKey}</p>
        </div>
        {children}
      </div>
    </>);

  return (
    <li className="mt-[24px] group">
      {isSwitch
        ? 
        (<div className="flex items-center">
          {content}
        </div>)
        :
        isButton
          ?
          (<button type="button" onClick={onButtonClick}>
            {content}
          </button>)
          :
          (<Link href={href} className="flex items-center">
            {content}
          </Link>)
      }
    </li>
  );
}

export default QuickToolsMenuItem;