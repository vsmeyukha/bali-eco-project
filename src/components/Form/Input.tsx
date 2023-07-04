import { ReactElement, ChangeEvent } from "react";

const inputStyles = 'border border-solid border-[#00265F] border-opacity-10 rounded-[10px] mt-[8px] px-[10px] w-full h-[53px] focus:outline-none active:outline-none';

export interface InputProps {
  label: string,
  name: string,
  value: string,
  type?: string,
  handleChange?: (e: ChangeEvent<any>) => void,
  valSuccess: boolean,
  valErrorMessage: string,
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  value,
  handleChange,
  type,
  valSuccess,
  valErrorMessage,
}): ReactElement => {
  return (
    <>
      <label className="flex flex-col mt-[32px] w-full">
        {label}
        <input
          type={type ?? "text"}
          name={name}
          value={value}
          onChange={handleChange}
          className={inputStyles}>
        </input>
      </label>
      <span className="w-full text-left text-red-500 mt-[8px]">
        {(!valSuccess && value !== '') && valErrorMessage}
      </span>
    </>
  );
}

export default Input;