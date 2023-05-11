import { ReactElement, useState, Fragment } from "react";
import QuickPopupSwitchButton from "./QuickPopupSwitchButton";
import {switchContent} from '../../utils/types';

interface QuickPopupSwitchContainerProps {
  content: Array<switchContent>;
}

const QuickPopupSwitchContainer: React.FC<QuickPopupSwitchContainerProps> = ({content}): ReactElement => {
  const [selected, setSelected] = useState(content[0].code);

  const handleSelected = (code: string) => {
    setSelected(code);
  }

  return (
    <div className="rounded-[9px] bg-[#00265F] bg-opacity-10 h-[32px] p-[2px] flex flex-row items-center">
      {content.map((lang, index, arr) => {
        return (
          <Fragment key={lang.code}>

          <QuickPopupSwitchButton code={lang.code} text={lang.label} isSelected={selected === lang.code} onClick={handleSelected} />
            {
              selected !== lang.code
              &&
              selected !== arr[index + 1]?.code
              &&
              index !== arr.length - 1
                &&
                (<div className="h-[16px] border-[#3C3C43] border-opacity-40 border-[0.5px]"></div>)
            }
          </Fragment>
            )
      })}
    </div>
  );
}

export default QuickPopupSwitchContainer;