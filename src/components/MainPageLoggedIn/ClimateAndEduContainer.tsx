import { ReactElement, ReactNode } from "react";

const ClimateAndEduContainer: React.FC<{children: ReactNode}> = ({children}): ReactElement => {
  return (
    <div className="bg-[#F5F5F5] w-full pt-[120px] pb-[90px]">
      {children}
    </div>
  )
}

export default ClimateAndEduContainer;