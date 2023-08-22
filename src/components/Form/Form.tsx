import { ReactElement, ReactNode, FormEvent } from "react";

interface FormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void,
  children: ReactNode,
}

// ? A styled form wrapper component.

const Form: React.FC<FormProps> = ({ onSubmit, children }): ReactElement => {
  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col items-center mt-[8px] font-montserrat text-[16px] leading-[20px] text-[#00265F]">
      {children}
    </form>
  )
}

export default Form;