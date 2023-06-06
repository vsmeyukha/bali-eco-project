import { ReactElement, ReactNode } from "react";

interface QuickPopupSwitchContainerProps {
  children: ReactNode,
}

const QuickPopupSwitchContainer: React.FC<QuickPopupSwitchContainerProps> = ({children }): ReactElement => {
  
  return (
    <div className="rounded-[9px] bg-[#00265F] bg-opacity-10 h-[32px] p-[2px] flex flex-row items-center">
      {children }
    </div>
  );
}

export default QuickPopupSwitchContainer;