import { ReactElement, ReactNode } from "react";

const SwitchAndLangsContainer:React.FC<{children: ReactNode}> = ({children}): ReactElement => {
  return (
    <div className='flex flex-row justify-between w-full font-montserrat text-[14px] leading-[17px] relative'>
      {children}
    </div>
  );
}

export default SwitchAndLangsContainer;