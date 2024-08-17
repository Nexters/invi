import { debounce } from "es-toolkit";

export function EditorInput({
  id,
  componentPrefix,
  debounceMs = 150,
  onChange,
  onDebounceChange,
  ...props
}: {
  componentPrefix: React.ReactNode;
  debounceMs?: number;
  onDebounceChange?: React.ComponentProps<"input">["onChange"];
} & React.ComponentProps<"input">) {
  return (
    <div className="-ml-0.5 mr-2 flex h-7 items-center gap-2 rounded-sm px-1.5 py-0.5 ring-border focus-within:bg-secondary hover:ring-1">
      <label htmlFor={id}>{componentPrefix}</label>
      <input
        {...props}
        id={id}
        onChange={
          onDebounceChange ? debounce(onDebounceChange, debounceMs) : onChange
        }
        className="f-full w-full flex-1 bg-transparent text-sm focus-visible:outline-none"
      />
    </div>
  );
}
