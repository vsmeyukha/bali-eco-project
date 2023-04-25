import { ReactElement, ReactNode, FormEvent } from "react";

interface FormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void,
  children: ReactNode,
}

const Form: React.FC<FormProps> = ({onSubmit, children}): ReactElement => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col mt-[8px] font-montserrat text-[16px] leading-[20px] text-[#00265F]">
      {children}
    </form>
  )
}

export default Form;