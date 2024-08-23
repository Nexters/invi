"use client";

import Script from "next/script";
import { env } from "~/lib/env";

export default function KakaoShareScript() {
  const kakaoInit = () => {
    try {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(env.NEXT_PUBLIC_KAKAO_JS_KEY);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
        integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4"
        crossOrigin="anonymous"
        onLoad={kakaoInit}
      />
    </>
  );
}
