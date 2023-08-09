import { Dispatch, ReactElement, ReactNode, SetStateAction } from "react";
import { Dialog } from "@headlessui/react";

interface PopupProps {
  open: boolean,
  onClose: Dispatch<SetStateAction<boolean>>,
  children: ReactNode
}

const Popup: React.FunctionComponent<PopupProps> = ({open, onClose, children}): ReactElement => {

  return (
      <Dialog open={open} onClose={() => onClose(false)} className="relative z-50">
        <Dialog.Backdrop className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-[12px] w-full max-w-sm p-[16px] flex flex-col">
            {children}
          </Dialog.Panel>
        </div>
      </Dialog>
  );
}

export default Popup;