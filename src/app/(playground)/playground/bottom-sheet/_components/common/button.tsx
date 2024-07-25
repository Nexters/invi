import React from 'react';
import { Button, ButtonProps } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const InviButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { className, ...restProps } = props;
    return (
      <Button
        className={cn(
          "h-full w-full rounded-xl bg-[#5E8AFF] text-lg text-white",
          className
        )}
        ref={ref}
        {...restProps}
      />
    );
  }
);

export default InviButton;