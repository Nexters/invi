export type kakaoShareFeedProps = {
  link: string;
  title: string;
  description: string;
  imageUrl: string;
};

export function kakaoShareInvi({ link, ...props }: kakaoShareFeedProps) {
  window.Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      ...props,
      imageWidth: 600,
      imageHeight: 450,
      link: {
        mobileWebUrl: link,
        webUrl: link,
      },
    },
    buttons: [
      {
        title: "초대장 열기",
        link: {
          mobileWebUrl: link,
          webUrl: link,
        },
      },
    ],
  });
}
