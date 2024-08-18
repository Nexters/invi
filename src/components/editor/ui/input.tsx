import { debounce } from "es-toolkit";
import { cn } from "~/lib/utils";

export function EditorInput({
  id,
  componentPrefix,
  componentSuffix,
  debounceMs = 150,
  onChange,
  onDebounceChange,
  className,
  ...props
}: {
  componentPrefix?: React.ReactNode;
  componentSuffix?: React.ReactNode;
  debounceMs?: number;
  onDebounceChange?: React.ComponentProps<"input">["onChange"];
} & React.ComponentProps<"input">) {
  return (
    <div
      className={cn(
        "-ml-0.5 flex h-7 items-center gap-2 rounded-sm px-1.5 py-0.5 text-sm ring-border focus-within:bg-secondary hover:ring-1",
        props.disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      {componentPrefix && <label htmlFor={id}>{componentPrefix}</label>}
      <input
        {...props}
        id={id}
        onChange={
          onDebounceChange ? debounce(onDebounceChange, debounceMs) : onChange
        }
        className="f-full w-full flex-1 bg-transparent focus-visible:outline-none"
      />
      {componentSuffix && <label htmlFor={id}>{componentSuffix}</label>}
    </div>
  );
}
