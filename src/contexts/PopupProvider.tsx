import { ReactElement, useState, ReactNode } from "react";
import PopupContext from "./PopupContext";

interface PopupProviderProps {
  children: ReactNode;
}

const PopupProvider = ({ children }: PopupProviderProps): ReactElement => {
  let [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const handlePopupClose = (): void => {
    setIsPopupOpen(false);
  }

  const handlePopupOpen = (): void => {
    setIsPopupOpen(true);
  }

  return (
    <PopupContext.Provider value={{isPopupOpen, handlePopupClose, handlePopupOpen}}>
      {children}
    </PopupContext.Provider>
  )
}

export default PopupProvider;
