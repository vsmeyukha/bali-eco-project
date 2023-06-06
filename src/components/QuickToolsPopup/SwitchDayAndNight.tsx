import { ReactElement, Fragment } from "react";
import QuickPopupSwitchButton from "./QuickPopupSwitchButton";
import { switchContent } from "@/utils/types";

interface SwitchDayAndNightProps {
  isDay: string, 
  handleColorTheme: (code: string) => void,
}

const SwitchDayAndNight: React.FC<SwitchDayAndNightProps> = ({isDay, handleColorTheme}): ReactElement => {
  const dayAndNight: Array<switchContent> = [
    { code: 'on', label: 'ON' },
    { code: 'off', label: 'OFF' },
  ];

  const handleSelectColorTheme = (code: string): void => {
    handleColorTheme(code);
  }

  return (
    <>
      {dayAndNight.map((color, index, arr) => {
        return (
          <Fragment key={color.code}>
            <QuickPopupSwitchButton
              code={color.code}
              text={color.label}
              isSelected={isDay === color.code}
              onClick={handleSelectColorTheme} />
            {
              isDay !== color.code
              &&
              isDay !== arr[index + 1]?.code
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

export default SwitchDayAndNight;