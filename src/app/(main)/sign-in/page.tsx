import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import Bee from "~/assets/bee.png";
import GoogleLogo from "~/assets/google-logo.png";
import Mail from "~/assets/mail.png";
import Star from "~/assets/star.png";
import { InView } from "~/components/core/in-view";
import { TextEffect } from "~/components/core/text-effect";
import { Button } from "~/components/ui/button";
import { getAuth } from "~/lib/auth/utils";

export default async function Page() {
  const auth = await getAuth();

  if (auth.session) {
    redirect("/dashboard");
  }

  return (
    <>
      <header className="fixed left-10 top-8 z-10 flex items-center">
        <Link href="/">
          <Image src="/landing-logo.png" alt="logo" width={85} height={29} />
        </Link>
      </header>
      <main className="mx-auto flex min-h-screen w-fit flex-col items-center justify-center px-4">
        <div className="relative">
          <InView className="absolute -right-[0px] -top-[90px] sm:-right-[30px]">
            <Image src={Bee} alt="bee" width={125} height={111} />
          </InView>
          <InView
            className="absolute -left-[80px] top-[100px] hidden sm:block"
            transition={{ delay: 0.2 }}
          >
            <Image src={Star} alt="star" width={63} height={56} />
          </InView>
          <InView
            className="absolute -right-[100px] top-[270px] hidden sm:block"
            transition={{ delay: 0.4 }}
          >
            <Image src={Mail} alt="mail" width={100} height={100} />
          </InView>
          <section className="mb-[56px] flex flex-col items-center gap-y-6">
            <h2 className="text-[2.5em] font-semibold -tracking-[0.2px]">
              당신의 환대,
              <span className="font-[950]"> INVI</span>
            </h2>
            <TextEffect className="text-xl -tracking-[0.2px] text-[#333333]">
              인비와 함께 나만의 초대장을 만들어보세요
            </TextEffect>
          </section>
          <section className="flex min-w-[417px] flex-col items-center gap-y-7">
            <Button variant="outline" className="h-16 w-full" asChild>
              <a
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
                <p className="text-xl">Google 로그인</p>
              </a>
            </Button>
            <span className="flex gap-x-2 text-gray-800">
              <TextEffect
                className="text-gray-800"
                variants={{
                  container: {
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.25,
                      },
                    },
                  } as any,
                }}
              >
                아직 계정이 없으신가요?
              </TextEffect>
              <a
                href="/sign-in/google"
                className="font-semibold text-gray-950 underline underline-offset-2"
              >
                <TextEffect
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          delayChildren: 0.6,
                        },
                      },
                    } as any,
                  }}
                >
                  가입하기
                </TextEffect>
              </a>
            </span>
          </section>
        </div>
      </main>
    </>
  );
}
