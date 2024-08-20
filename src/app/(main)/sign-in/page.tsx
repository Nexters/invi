import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import Bee from "~/assets/bee.png";
import GoogleLogo from "~/assets/google-logo.png";
import Mail from "~/assets/mail.png";
import Star from "~/assets/star.png";
import { Button } from "~/components/ui/button";
import { getAuth } from "~/lib/auth/utils";

export default async function Page() {
  const auth = await getAuth();

  if (auth.session) {
    redirect("/dashboard");
  }

  return (
    <main className="relative mx-auto mt-[267px] flex min-h-screen w-fit flex-col items-center">
      <Image
        src={Bee}
        alt="bee"
        width={125}
        height={111}
        className="absolute -right-[30px] -top-[90px]"
      />
      <Image
        src={Star}
        alt="star"
        width={63}
        height={56}
        className="absolute -left-[80px] top-[100px]"
      />
      <Image
        src={Mail}
        alt="mail"
        width={100}
        height={100}
        className="absolute -right-[100px] top-[270px]"
      />
      <section className="mb-[56px] flex flex-col items-center gap-y-6">
        <h2 className="text-[40px] font-semibold -tracking-[0.2px]">
          당신의 환대, INVI
        </h2>
        <p className="text-xl -tracking-[0.2px] text-[#333333]">
          인비와 함께 나만의 초대장을 만들어보세요
        </p>
      </section>
      <section className="flex min-w-[417px] flex-col items-center gap-y-7">
        <Button variant="outline" className="h-16 w-full" asChild>
          <Link
            href="/sign-in/google"
            className="flex gap-x-2 rounded-md px-6 py-4"
          >
            <Image
              src={GoogleLogo}
              width={38}
              height={38}
              alt="google logo"
              className="rounded-full"
            />
            Google 로그인
          </Link>
        </Button>
        <span className="flex gap-x-2 text-gray-800">
          <p className="text-gray-800">아직 계정이 없으신가요?</p>
          <Link
            href="/sign-in/google"
            className="font-semibold text-gray-950 underline underline-offset-2"
          >
            가입하기
          </Link>
        </span>
      </section>
    </main>
  );
}
