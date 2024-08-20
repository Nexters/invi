import Image from "next/image";
import Link from "next/link";
import MainImage from "~/assets/main.png";
import MainImage2 from "~/assets/main2.png";
import MainImage3 from "~/assets/main3.png";
import MainImage4 from "~/assets/main4.png";
import MainPiece from "~/assets/main_piece.png";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col px-7">
      <header className="pt-[58px]">
        <Image
          src="/logo1.png"
          alt="logo"
          width={85}
          height={29}
          className="pb-5"
        />
        <section className="flex flex-col gap-y-3">
          <h1 className="text-4xl font-bold leading-[40px]">
            당신의 환대, INVI
          </h1>
          <h3 className="break-keep text-lg font-medium leading-5 -tracking-[0.2px] text-[#888888]">
            따뜻한 마음을 담아 당신의 환대를 전해보세요.
          </h3>
        </section>
      </header>
      <div className="mt-[156px] flex justify-center">
        <Image src={MainImage} alt="main" width={185} height={269} />
      </div>
      <section className="my-[152px] mt-20 flex justify-center">
        <Image src={MainPiece} alt="main" width={20} height={24} />
      </section>
      <ul className="flex flex-col gap-y-[180px] pb-[100px]">
        <section>
          <Badge className="h-[38px] rounded-[10px] bg-[#424242] px-4 text-sm leading-none">
            최적화 템플릿 사용
          </Badge>
          <div className="my-6 flex justify-center py-9">
            <Image src={MainImage2} alt="main" width={185} height={135} />
          </div>
          <article className="flex flex-col gap-y-3">
            <p className="whitespace-pre-wrap text-3xl font-semibold leading-[40px] -tracking-[0.5px] text-[#222]">
              {`다양한 템플릿으로\n빠른 초대장 만들기`}
            </p>
            <p className="whitespace-pre text-base leading-6 -tracking-[0.2px] text-[#333]">
              {`상황에 따라 제공되는 다양한 템플릿을\n사용해 멋진 초대장을 빠르게 만들 수 있어요`}
            </p>
          </article>
        </section>
        <section>
          <Badge className="h-[38px] rounded-[10px] bg-[#424242] px-4 text-sm leading-none">
            자유로운 커스터마이징
          </Badge>
          <div className="my-6 flex justify-center py-9">
            <Image src={MainImage3} alt="main" width={240} height={120} />
          </div>
          <article className="flex flex-col gap-y-3">
            <p className="whitespace-pre-wrap text-3xl font-semibold leading-[40px] -tracking-[0.5px] text-[#222]">
              {`원하는대로 커스텀해\n나만의 초대장 만들기`}
            </p>
            <p className="whitespace-pre text-base leading-6 -tracking-[0.2px] text-[#333]">
              {`높은 커스터마이징 자유도로 세상에\n하나뿐인 나만의 초대장을 만들 수 있어요`}
            </p>
          </article>
        </section>
        <section>
          <Badge className="h-[38px] rounded-[10px] bg-[#424242] px-4 text-sm leading-none">
            초대장 특화 기능
          </Badge>
          <div className="my-6 flex justify-center py-6">
            <Image
              src={MainImage4}
              alt="main"
              width={288}
              height={269}
              className="h-[269px] w-[288px]"
            />
          </div>
          <article className="flex flex-col gap-y-3">
            <p className="whitespace-pre-wrap text-3xl font-semibold leading-[40px] -tracking-[0.5px] text-[#222]">
              {`초대장 특화 기능으로\n편하게 초대하기`}
            </p>
            <p className="whitespace-pre text-base leading-6 -tracking-[0.2px] text-[#333]">
              {`쉬운 SNS 공유, 지도 연동, 참석여부 조사 등\n초대장 특화 기능으로 참석자를 초대할 수 있어요`}
            </p>
          </article>
        </section>
      </ul>

      <footer className="flex justify-center px-4 py-8">
        <Button className="h-[60px] w-full rounded-[12px] bg-[#2B2D36] text-lg font-bold">
          <Link href="/dashboard">무료로 시작하기</Link>
        </Button>
      </footer>
      {/* <main className="flex-1">
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
      </footer> */}
    </div>
  );
}
