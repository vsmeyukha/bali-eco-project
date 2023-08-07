import { ReactElement, Dispatch, SetStateAction } from "react";

import InformationPopup from '../InformationPopup';
import DeletePostPopupContent from "./DeletePostPopupContent";

import { IPost, IMarker } from "@/pages/map";

interface DeletePostPopupProps {
  open: boolean,
  onClose: Dispatch<SetStateAction<boolean>>,
  activePost: IPost | null,
  setActivePost: Dispatch<SetStateAction<IPost | null>>,
  setCoordinates: Dispatch<SetStateAction<IMarker[]>>
}

const DeletePostPopup: React.FC<DeletePostPopupProps> = ({open, onClose, activePost, setActivePost, setCoordinates}): ReactElement => {
  return (
    <InformationPopup open={open} onClose={onClose}>
      <DeletePostPopupContent
        onClose={onClose}
        activePost={activePost}
        setActivePost={setActivePost}
        setCoordinates={setCoordinates} />
    </InformationPopup>
  )
}

export default DeletePostPopup;