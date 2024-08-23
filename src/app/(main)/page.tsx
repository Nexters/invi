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
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-7">
      <header className="pt-[58px]">
        <Image
          src="/landing-logo.png"
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
        <Button
          asChild
          className="h-[60px] w-full rounded-[12px] bg-[#2B2D36] text-lg font-bold"
        >
          <Link href="/dashboard">무료로 시작하기</Link>
        </Button>
      </footer>
    </div>
  );
}
