import { ALink, AMain } from "~/app/(playground)/playground/inner-tools";
import SignInForm from "~/app/(playground)/playground/sign-in/sign-in-form";
import { getAuth } from "~/lib/auth/utils";

export default async function Page() {
  const auth = await getAuth();

  return (
    <AMain>
      <ALink href="/playground">playground</ALink>
      <SignInForm />
      <pre className="p-4 text-xs">{JSON.stringify(auth, null, 2)}</pre>
    </AMain>
  );
}
