import { OAuth2RequestError } from "arctic";
import ky from "ky";
import { kakao } from "~/lib/auth/lucia";
import { createSession } from "~/lib/auth/utils";
import { createUser, getUser } from "~/lib/db/schema/users.query";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await kakao.validateAuthorizationCode(code);
    const accessToken = tokens.accessToken();

    // @see https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#req-user-info
    const user = await ky("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).json<{
      id: string;
      name: string;
      // TODO: 비즈앱 전환
      email: string;
      phone_number: string;
      kakao_account: {
        profile: {
          nickname: string;
          profile_image_url: string;
        };
      };
    }>();
    console.log(":user", user);

    let dbUser = await getUser(user.id);

    if (!dbUser) {
      dbUser = await createUser({
        id: user.id,
        name: user.name,
        provider: "kakao",
      });
    }

    createSession(dbUser.id);

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/playground/sign-in",
      },
    });
  } catch (e) {
    console.log(e);
    if (e instanceof OAuth2RequestError) {
      return new Response(e.message, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}
