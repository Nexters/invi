import type { ChangeEvent, ReactNode } from "react";
import { createContext } from "react";
interface ImageRadioContextType {
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const ImageRadioContext = createContext<
  ImageRadioContextType | undefined
>(undefined);

interface ImageRadioProps {
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  children: ReactNode;
}
export function ImageRadio({
  name,
  onChange,
  value,
  children,
}: ImageRadioProps) {
  return (
    <ImageRadioContext.Provider value={{ name, onChange, value }}>
      <div className="flex w-full flex-row space-x-3">{children}</div>
    </ImageRadioContext.Provider>
  );
}
