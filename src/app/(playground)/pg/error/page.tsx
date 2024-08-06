"use client";

import { useEffect } from "react";
import { ALink, AMain } from "~/app/(playground)/pg/inner-tools";

export default function Page() {
  useEffect(() => {
    throw new Error("This is an intentional error");
  }, []);

  return (
    <AMain>
      <ALink href="./">playground</ALink>
      <div>
        <h1>Test</h1>
      </div>
    </AMain>
  );
}
