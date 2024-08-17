import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { getAuth } from "~/lib/auth/utils";

export default async function Page() {
  const auth = await getAuth();

  if (auth.session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex h-screen justify-center bg-secondary p-10">
      <div>
        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle className="text-xl">인비 로그인</CardTitle>
            <CardDescription>계속하려면 로그인하세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/sign-in/google">구글로 시작하기</Link>
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/sign-in/kakao">카카오</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/sign-in/naver">네이버</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
