import { CircleIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-14 items-center px-4 lg:px-6">
        <Link className="flex items-center justify-center" href="#">
          <CircleIcon className="h-6 w-6" />
          <span className="sr-only">Invi</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link href="/sign-in">
            <Button size="sm">시작하기</Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="mx-auto aspect-video overflow-hidden rounded-xl bg-secondary object-cover sm:w-full lg:order-last lg:aspect-square" />
              <div className="flex flex-col justify-center gap-8">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                  초대장 플랫폼, <b className="font-black">인비</b> 🐝
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  따뜻한 마음을 담아, 당신의 환대를 전해주세요.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/sign-in">
                    <Button size="lg">무료로 시작하기</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                  커스텀 디자인
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  간편하지만, 자유롭게
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  커스텀 디자인, 실시간 미리보기, 간편한 공유 등
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-[0.875rem] font-normal leading-[1.125rem] text-muted-foreground">
          Invi © 2024. All rights reserved
        </p>
        <nav className="flex gap-4 text-muted-foreground sm:ml-auto sm:gap-6">
          <Link className="text-xs" href="#">
            이용약관
          </Link>
          <Link className="text-xs" href="#">
            개인정보 처리방침
          </Link>
        </nav>
      </footer>
    </div>
  );
}
