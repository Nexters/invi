import Image from "next/image";
import { useContext } from "react";
import { ImageRadioContext } from "~/app/(playground)/playground/bottom-sheet/_components/image-radio/container";

interface ImageRadioOptionProps {
  value: string;
  imageUrl?: string | {};
  text: string;
  checked?: boolean;
}

export function ImageRadioOption({
  value,
  imageUrl,
  text,
  checked,
}: ImageRadioOptionProps) {
  const context = useContext(ImageRadioContext);
  if (!context) {
    throw new Error("ImageRadioOption must be used within an ImageRadio");
  }

  return (
    <label className="relative flex flex-1 cursor-pointer flex-col items-center">
      <input
        type="radio"
        name={context.name}
        value={value}
        className="peer sr-only absolute"
        onChange={context.onChange}
        checked={checked}
      />
      <div className="flex h-full w-full flex-col items-center space-y-5 rounded-2xl border border-[#3C3C3C] bg-[#222222] p-4 transition-all duration-200 hover:border-blue-300 peer-checked:border-blue-500">
        {imageUrl && (
          <Image
            src={imageUrl as string}
            alt={text}
            width={100}
            height={100}
            className="mb-2 h-24 w-24 object-cover"
          />
        )}
        <span className="text-center font-medium">{text}</span>
      </div>
    </label>
  );
}
