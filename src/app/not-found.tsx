import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-8 pb-20 lg:p-14">
      <div className="align-stretch mx-auto flex h-full w-full max-w-3xl flex-col">
        <div className="h-[45%] py-12">
          <div className="mb-16">
            <h1 className="mb-2 text-2xl font-medium">
              페이지를 찾지 못했어요
            </h1>
            <p className="mb-8 text-sm text-muted-foreground">
              페이지 주소가 정확한지 확인해주세요
            </p>
            <Button asChild>
              <Link href="/">홈으로 가기</Link>
            </Button>
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
