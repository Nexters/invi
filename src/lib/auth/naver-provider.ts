import type { OAuth2Tokens } from "arctic";
import { createOAuth2Request, sendTokenRequest } from "arctic/dist/request";

const authorizationEndpoint = "https://nid.naver.com/oauth2.0/authorize";
const tokenEndpoint = "https://nid.naver.com/oauth2.0/token";

export class Naver {
  private clientId: string;
  private clientSecret: string;
  private redirectURI: string;

  constructor(clientId: string, clientSecret: string, redirectURI: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectURI = redirectURI;
  }

  public createAuthorizationURL(state: string): URL {
    const url = new URL(authorizationEndpoint);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("client_id", this.clientId);
    url.searchParams.set("redirect_uri", this.redirectURI);
    url.searchParams.set("state", state);
    return url;
  }

  public async validateAuthorizationCode(
    code: string,
    state: string,
  ): Promise<OAuth2Tokens> {
    const body = new URLSearchParams();
    body.set("grant_type", "authorization_code");
    body.set("client_id", this.clientId);
    body.set("client_secret", this.clientSecret);
    body.set("code", code);
    body.set("state", state);
    const request = createOAuth2Request(tokenEndpoint, body);
    const tokens = await sendTokenRequest(request);
    return tokens;
  }

  public async refreshAccessToken(refreshToken: string): Promise<OAuth2Tokens> {
    const body = new URLSearchParams();
    body.set("grant_type", "refresh_token");
    body.set("client_id", this.clientId);
    body.set("client_secret", this.clientSecret);
    body.set("refresh_token", refreshToken);
    const request = createOAuth2Request(tokenEndpoint, body);
    const tokens = await sendTokenRequest(request);
    return tokens;
  }

  public async revokeToken(accessToken: string): Promise<OAuth2Tokens> {
    const body = new URLSearchParams();
    body.set("grant_type", "refresh_token");
    body.set("client_id", this.clientId);
    body.set("client_secret", this.clientSecret);
    body.set("access_token", accessToken);
    body.set("service_provider", "NAVER");

    const request = createOAuth2Request(tokenEndpoint, body);
    const tokens = await sendTokenRequest(request);
    return tokens;
  }
}
