import { ReactElement } from "react";

const TextAreaInputStyles = 'border border-solid border-[#00265F] border-opacity-10 rounded-[10px] mt-[8px] w-full h-[253px] focus:outline-none active:outline-none';

interface InputProps {
  label: string,
  name: string,
}

const TextAreaInput: React.FC<InputProps> = ({label, name}): ReactElement => {
  return (
    <label className="flex flex-col mt-[32px] w-full">
        {label}
        <input type="text" name={name} className={TextAreaInputStyles}></input>
    </label>
  );
}

export default TextAreaInput;