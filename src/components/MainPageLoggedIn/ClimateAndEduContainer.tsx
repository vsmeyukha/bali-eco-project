import { ReactElement, ReactNode } from "react";

interface ClimateAndEduContainerProps {
  children: ReactNode
}

const ClimateAndEduContainer: React.FC<ClimateAndEduContainerProps> = ({children}: ClimateAndEduContainerProps): ReactElement => {
  return (
    <div className="bg-[#F5F5F5] w-full pt-[120px] pb-[90px]">
      {children}
    </div>
  )
}

export default ClimateAndEduContainer;