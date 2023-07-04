import { SetStateAction } from "react";

export const getRandom = (num: number) => Math.floor((Math.random() * num));

export const handleFormChange = <T>(
  e: React.ChangeEvent<HTMLInputElement>,
  setSomeState: React.Dispatch<SetStateAction<T>>
) => {
  setSomeState((formState: T) => {
    const newState = { ...formState, [e.target.name]: e.target.value } as T;
    return newState;
  });
}