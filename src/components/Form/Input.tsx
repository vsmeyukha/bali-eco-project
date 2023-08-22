import { ReactElement, ChangeEvent } from "react";

const inputStyles = 'border border-solid border-[#00265F] border-opacity-10 rounded-[10px] mt-[8px] px-[10px] w-full h-[53px] focus:outline-none active:outline-none';

export interface InputProps {
  label: string, // ? Label text for the input / текст лейбла инпута
  name: string, // ? Name attribute for the input / имя инпута
  value: string, // ? Current value of the input / текущее значение инпута
  type?: string, // ? Input type (e.g., "text", "password"). Default is "text" / тип инпута ("text", "password" и так далее)
  handleChange?: (e: ChangeEvent<any>) => void, // ? Function to handle input value changes / функция изменения значения инпута
  valSuccess: boolean, // ? Indicates whether the input value is valid / значение, показывающее, валиден ли текущий инпут
  valErrorMessage: string, // ? Error message to display when validation fails / сообщение об ошибке, если текущее значение инпута не прошло валидацию
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
      {/* Label and input field */}
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
      {/* Validation error message */}
      <span className="w-full text-left text-red-500 mt-[8px]">
        {(!valSuccess && value !== '') && valErrorMessage}
      </span>
    </>
  );
}

export default Input;