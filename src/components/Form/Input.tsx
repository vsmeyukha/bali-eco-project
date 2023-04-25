import { ReactElement } from "react";

const inputStyles = 'border border-solid border-[#00265F] border-opacity-10 rounded-[10px] mt-[8px] w-[442px] h-[53px] focus:outline-none active:outline-none';

interface InputProps {
  label: string,
  name: string,
}

const Input: React.FC<InputProps> = ({label, name}): ReactElement => {
  return (
    <label className="flex flex-col mt-[32px]">
        {label}
        <input type="text" name={name} className={inputStyles}></input>
    </label>
  );
}

export default Input;