import { createContext } from "react";

interface PopupContextType {
  isPopupOpen: boolean;
  handlePopupClose: () => void;
  handlePopupOpen: () => void;
}

const PopupContext = createContext<PopupContextType>({
  isPopupOpen: false,
  handlePopupClose: () => {},
  handlePopupOpen: () => {},
});

export default PopupContext;
