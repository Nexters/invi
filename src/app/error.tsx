"use client";

import { useEffect } from "react";
import { Button } from "~/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  // 에러가 발생한 컴포넌트를 다시 렌더링
  reset: () => void;
}) {
  useEffect(() => {
    // 에러 추적을 위함
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto max-w-6xl px-5 py-8 pb-20 lg:p-14">
      <div className="align-stretch mx-auto flex h-full w-full max-w-3xl flex-col">
        <div className="h-[45%] py-12">
          <div className="mb-16">
            <h1 className="mb-2 text-2xl font-medium">
              오류가 발생되었습니다.
            </h1>
            <p className="mb-8 text-sm text-muted-foreground">
              잠시 후 다시 시도해주세요.
            </p>
            <Button onClick={() => reset()}>다시 시도</Button>
          </div>
        </div>
        <div className="w-full border-t py-4">
          <p className="text-[0.875rem] font-normal leading-[1.125rem] text-muted-foreground">
            Invi © 2024. All rights reserved
          </p>
        </div>
      </div>
    </main>
  );
}
