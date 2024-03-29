import { ReactElement, ReactNode } from "react";

// ? Container for popups switcher and language choice.
// ? Контейнер для переключателя попапов и выбора языка.

const SwitchAndLangsContainer:React.FC<{children: ReactNode}> = ({children}): ReactElement => {
  return (
    <div className='flex flex-row justify-between items-start sm:w-full w-4/5 font-montserrat text-[14px] leading-[17px] relative'>
      {children}
    </div>
  );
}

export default SwitchAndLangsContainer;