import { signOutAction } from "~/app/(auth)/sign-out/actions";

export async function GET(): Promise<Response> {
  const result = await signOutAction();

  if (result.error) {
    return new Response(null, {
      status: 401,
    });
  }

  if (result.refresh) {
    return new Response(null, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
        Refresh: "0",
      },
    });
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/dashboard",
    },
  });
}
