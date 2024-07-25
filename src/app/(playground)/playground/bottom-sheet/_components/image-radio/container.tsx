import React, { ChangeEvent, ReactNode } from "react";

interface ImageRadioContextType {
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const ImageRadioContext = React.createContext<
  ImageRadioContextType | undefined
>(undefined);

interface ImageRadioProps {
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
}
export function ImageRadio({ name, onChange, children }: ImageRadioProps) {
  return (
    <ImageRadioContext.Provider value={{ name, onChange }}>
      <div className="flex w-full flex-row space-x-3">{children}</div>
    </ImageRadioContext.Provider>
  );
}
