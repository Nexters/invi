import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function SignInForm() {
  return (
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
  );
}
