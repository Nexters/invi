import { env } from "~/lib/env";

export const cdnHost = "https://invi.cdn.ntruss.com";

export const thumbnailOrigin = (path: string) => {
  const middleware = path.startsWith("/") ? "" : "/";

  return `${env.NCP_ENDPOINT}/${env.NCP_BUCKET_NAME}${middleware}${path}`;
};

export const thumbnail = (path: string) => {
  const middleware = path.startsWith("/") ? "" : "/";

  return `${cdnHost}${middleware}${path}`;
};
