import { ReactElement, ChangeEvent } from "react";

const inputStyles = 'border border-solid border-[#00265F] border-opacity-10 rounded-[10px] mt-[8px] px-[10px] w-full h-[53px] focus:outline-none active:outline-none';

export interface InputProps {
  label: string,
  name: string,
  value: string,
  handleChange?: (e: ChangeEvent<any>) => void,
}

const Input: React.FC<InputProps> = ({ label, name, value, handleChange }): ReactElement => {
  return (
    <label className="flex flex-col mt-[32px] w-full">
        {label}
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        className={inputStyles}></input>
    </label>
  );
}

export default Input;