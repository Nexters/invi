export function EditorInput({
  id,
  componentPrefix,
  ...props
}: { componentPrefix: React.ReactNode } & React.ComponentProps<"input">) {
  return (
    <div className="-ml-0.5 mr-2 flex h-7 items-center gap-2 rounded-sm px-1.5 py-0.5 ring-border focus-within:bg-secondary hover:ring-1">
      <label htmlFor={id}>{componentPrefix}</label>
      <input
        id={id}
        {...props}
        className="f-full w-full flex-1 bg-transparent text-sm focus-visible:outline-none"
      />
    </div>
  );
}
