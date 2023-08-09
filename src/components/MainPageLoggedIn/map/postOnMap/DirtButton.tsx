import { ReactElement, ReactNode } from 'react';

interface DirtButton {
  smile?: ReactNode,
  text: string,
  textColor?: string,
  fontWeight?: string,
  onClick: () => void
}

const DirtButton: React.FC<DirtButton> = ({smile, text, textColor, fontWeight, onClick}): ReactElement => {
  return (
    <button
      type="button"
      className="
      w-[58px]
      h-[54px]
      bg-white
      bg-opacity-1
      rounded-[10px]
      border-b-2
      border-opacity-10
      border-[#00265F]
      flex
      flex-col
      justify-center
      items-center
      pt-[11px]
      hover:transform
      hover:scale-125
      duration-200"

      onClick={onClick}
    >
      {smile}
      <p className={`mb-[4px] ${textColor} ${fontWeight}`}>{text}</p>
    </button>
  );
}

export default DirtButton;