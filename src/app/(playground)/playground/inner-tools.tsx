import Link, { type LinkProps } from "next/link";
import { cn } from "~/lib/utils";

export function AMain(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <main
      {...props}
      className={cn(
        "mx-auto w-full max-w-2xl space-y-20 px-10 pt-20",
        props.className,
      )}
    />
  );
}

export function ALink({
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        "inline-block font-bold text-blue-500 transition-all hover:text-blue-700",
        className,
      )}
    />
  );
}
