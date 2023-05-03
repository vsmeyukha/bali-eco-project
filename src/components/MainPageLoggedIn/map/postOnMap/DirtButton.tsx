import { ReactElement, ReactNode } from 'react';

interface DirtButton {
  smile: ReactNode,
  text: string,
}

const DirtButton: React.FC<DirtButton> = ({smile, text}): ReactElement => {
  return (
    <button
      className="
      w-[58px]
      h-[54px]
      bg-white
      bg-opacity-1
      rounded-[10px]
      shadow
      border-b-2
      border-opacity-10
      border-[#00265F]
      flex
      flex-col
      justify-between
      items-center
      pt-[11px]"
    >
      {smile}
      <p className='mb-[4px]'>{text}</p>
    </button>
  );
}

export default DirtButton;