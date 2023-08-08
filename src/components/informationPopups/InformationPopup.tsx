import { Dispatch, ReactElement, ReactNode, SetStateAction } from "react";
import { Dialog } from "@headlessui/react";
import Cross from "../../../public/images/svgs/cross.svg";

interface PopupProps {
  open: boolean,
  onClose: Dispatch<SetStateAction<boolean>>,
  children: ReactNode
}

const Popup: React.FunctionComponent<PopupProps> = ({open, onClose, children}): ReactElement => {

  return (
      <Dialog open={open} onClose={() => onClose(false)} className="relative z-50">
        <Dialog.Backdrop className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-[12px] w-full max-w-sm pt-[20px] pl-[30px] pr-[30px] pb-[15px] flex flex-col">
            {children}
          </Dialog.Panel>
        </div>
      </Dialog>
  );
}

export default Popup;