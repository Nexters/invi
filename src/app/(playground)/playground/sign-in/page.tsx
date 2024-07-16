import Link from "next/link";
import { ALink, AMain } from "~/app/(playground)/playground/inner-tools";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { getAuth } from "~/lib/auth/utils";

export default async function Page() {
  const auth = await getAuth();

  return (
    <AMain>
      <ALink href="/playground">playground</ALink>
      {!!auth.user ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              환영합니다, {auth.user.name}님
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="p-4 text-xs">{JSON.stringify(auth, null, 2)}</pre>
            <div className="flex flex-col gap-4">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/sign-out">로그아웃</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">로그인</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/sign-in/google">Continue with Google</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/sign-in/kakao">Continue with Kakao</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/sign-in/naver">Continue with Naver</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </AMain>
  );
}
