import { ReactElement } from "react";
import { InputProps } from "./Input";

const TextAreaInputStyles = 'border border-solid border-[#00265F] border-opacity-10 rounded-[10px] mt-[8px] px-[10px] pt-[10px] w-full h-[253px] focus:outline-none active:outline-none';

const TextAreaInput: React.FC<InputProps> = ({label, name, value, handleChange}): ReactElement => {
  return (
    <label className="flex flex-col mt-[32px] w-full">
        {label}
      <textarea
        name={name}
        className={TextAreaInputStyles}
        value={value}
        onChange={handleChange}
      />
    </label>
  );
}

export default TextAreaInput;