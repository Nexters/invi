import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    DATABASE_URL: z.string().min(1),
    /* ---- OAuth ---- */
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GOOGLE_REDIRECT_URI: z.string(),
    KAKAO_CLIENT_ID: z.string(),
    KAKAO_CLIENT_SECRET: z.string(),
    KAKAO_REDIRECT_URI: z.string(),
    NAVER_CLIENT_ID: z.string(),
    NAVER_CLIENT_SECRET: z.string(),
    NAVER_REDIRECT_URI: z.string(),
    /* ---- KaKao Map ---- */
    KAKAO_MAP_BASE_URL: z.string(),
    KAKAO_MAP_API_KEY: z.string(),
    DAUMCDN_POSTOCDE_URL: z.string(),
    /* ---- NCP ---- */
    NCP_ENDPOINT: z.string(),
    NCP_REGION: z.string(),
    NCP_ACCESS_KEY: z.string(),
    NCP_SECRET_KEY: z.string(),
    NCP_BUCKET_NAME: z.string(),
  },
  client: {},
  experimental__runtimeEnv: {},
});
