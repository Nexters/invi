"use client";

import Image from "next/image";
import { toast } from "sonner";

type MapType = "naver" | "kakao";
type MapUrls = Record<MapType, string>;

const Invi = () => {
  async function copyTextAsync(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }

  async function handleCopy(text: string) {
    await copyTextAsync(text);
    toast("복사되었습니다.", {
      duration: 2000,
      style: {
        backgroundColor: "black",
        opacity: 0.9,
        height: "56px",
        color: "white",
        border: 0,
      },
    });
  }

  const address = "서울시 공익활동지원센터";

  const openMap = (mapType: MapType, address: string) => {
    const mapUrls: MapUrls = {
      naver: `nmap://search?query=${address}`,
      kakao: `kakaomap://search?q=${address}`,
    };
    window.open(mapUrls[mapType]);
  };

  return (
    <div className="bg-[#1A1A1A] text-[#FBFBFB]">
      <header className="flex h-[69px] items-center justify-center bg-gradient-to-b from-black to-transparent">
        <Image src="/logo.png" alt="logo" width={52} height={25} />
      </header>
      <main className="flex flex-col items-center gap-y-[120px] bg-[#1A1A1A] -tracking-[0.2px] text-[#FBFBFB]">
        <section className="flex w-[320px] flex-col items-center text-xl font-semibold">
          <div className="mb-11 mt-10">
            <Image src="/image.png" alt="logo" width={120} height={120} />
          </div>
          <h2 className="text-xl font-semibold text-[#C28BFF]">NEXTERS</h2>
          <h1 className="text-3xl font-bold">4주차 세션 안내</h1>
          <article className="mt-8 flex w-full flex-col items-center rounded-[20px] bg-[#222222] pb-6 pt-5">
            <p className="mb-4">기획 발표</p>
            <ul className="flex flex-col gap-y-2">
              <li className="flex gap-x-4">
                <p className="text-[16px] font-semibold leading-6 text-blue-400">
                  일정
                </p>
                <p className="text-[16px] leading-6 text-[#D3D3D3]">
                  2024년 7월 27일 토요일
                </p>
              </li>
              <li className="flex gap-4">
                <p className="text-[16px] font-semibold leading-6 text-blue-400">
                  시간
                </p>
                <p className="text-[16px] leading-6 text-[#D3D3D3]">
                  오후 12:30 - 16:30
                </p>
              </li>
              <li className="flex gap-4">
                <p className="text-[16px] font-semibold leading-6 text-blue-400">
                  장소
                </p>
                <div>
                  <p className="whitespace-pre-wrap text-base font-medium leading-[26px] text-[#D3D3D3]">
                    {`용산구 백범로 99길 40\n용산베르디움프렌즈\n101동 지하1층`}
                  </p>
                  <p className="mt-1.5 text-sm text-gray-500">
                    서울공익활동지원센터
                  </p>
                </div>
              </li>
            </ul>
          </article>
        </section>
        <section className="flex flex-col items-center">
          <h3 className="text-2xl font-bold">장소 안내</h3>
          <Image
            src="/place.png"
            alt="place"
            width={300}
            height={218}
            className="my-8"
          />
          <div className="flex flex-col items-center">
            <p className="mb-3 text-lg font-semibold">
              서울공익활동센터 지하 1층
            </p>
            <p className="whitespace-pre-wrap text-center text-sm text-gray-300">
              {`삼각지역 도보 4분 거리입니다\n도착하시면 `}
              <span className="text-[#6E96FF]">모이다(다목적홀)</span>로
              모여주세요
            </p>
            <article className="mt-4 flex gap-x-3">
              <button onClick={() => openMap("naver", address)}>
                <Image
                  src="/naver-map.png"
                  alt="naver-map"
                  width={42}
                  height={42}
                />
              </button>
              <button onClick={() => openMap("kakao", address)}>
                <Image
                  src="/kakao-map.png"
                  alt="kakao-map"
                  width={42}
                  height={42}
                />
              </button>
              <button onClick={() => handleCopy(address)}>
                <Image src="/copy.png" width={42} height={42} alt="copy" />
              </button>
            </article>
          </div>
        </section>
        <section className="flex flex-col items-center">
          <h3 className="mb-8 text-2xl font-bold">세션 일정</h3>
          <ul className="w-full">
            <li className="flex max-h-[80px] min-w-[320px] flex-col justify-center gap-y-3 rounded-t-[20px] py-12 pl-6 text-sm odd:bg-[#222222] even:bg-[#282828]">
              <p className="font-semibold">12:30 - 12:40</p>
              <p className="font-medium text-[#D3D3D3]">세션 안내</p>
            </li>
            <li className="flex max-h-[80px] min-w-[320px] flex-col justify-center gap-y-3 py-12 pl-6 text-sm odd:bg-[#222222] even:bg-[#282828]">
              <p className="font-semibold">12:40 - 13:00</p>
              <p className="font-medium text-[#D3D3D3]">UT 준비</p>
            </li>
            <li className="flex max-h-[80px] min-w-[320px] flex-col justify-center gap-y-3 py-12 pl-6 text-sm odd:bg-[#222222] even:bg-[#282828]">
              <p className="font-semibold">13:00 - 14:20</p>
              <p className="font-medium text-[#D3D3D3]">
                UT 1부 진행 및 팀 작업
              </p>
            </li>
            <li className="flex max-h-[80px] min-w-[320px] flex-col justify-center gap-y-3 py-12 pl-6 text-sm odd:bg-[#222222] even:bg-[#282828]">
              <p className="font-semibold">14:20 - 14:40</p>
              <p className="font-medium text-[#D3D3D3]">쉬는 시간</p>
            </li>
            <li className="flex max-h-[80px] min-w-[320px] flex-col justify-center gap-y-3 py-12 pl-6 text-sm odd:bg-[#222222] even:bg-[#282828]">
              <p className="font-semibold">14:40 - 16:00</p>
              <p className="font-medium text-[#D3D3D3]">
                UT 2부 진행 및 팀 작업
              </p>
            </li>
            <li className="flex max-h-[80px] min-w-[320px] flex-col justify-center gap-y-3 rounded-b-[20px] py-12 pl-6 text-sm odd:bg-[#222222] even:bg-[#282828]">
              <p className="font-semibold">16:00 - 16:30</p>
              <p className="font-medium text-[#D3D3D3]">
                추가 작업 및 다음 세션 안내
              </p>
            </li>
          </ul>
        </section>
        <section className="flex flex-col items-center">
          <h2 className="text-2xl font-bold">UT 안내</h2>
          <div className="flex flex-col items-center gap-y-20">
            <section className="pt-8">
              <div className="text-center">
                <h3 className="mb-5 text-lg font-semibold text-i-secondary">
                  UT 순서 안내
                </h3>
                <p className="whitespace-pre-wrap text-center text-sm leading-[22px] text-[#D3D3D3]">
                  {`1부와 2부로 팀을 나누어서 UT 세션이 진행됩니다.\n해당 안내는 당일 한번 더 공지 예정입니다.`}
                </p>
              </div>
              <Image
                src="/ut-timeline.png"
                alt="ut-timeline"
                width={295}
                height={208}
                className="mt-5"
              />
            </section>
            <section className="flex flex-col items-center">
              <h3 className="text-xl font-semibold text-[#6E96FF]">
                UT 공간 안내
              </h3>
              <p className="my-5 whitespace-pre-wrap text-center text-sm leading-[22px] text-[#D3D3D3]">
                {`UT를 위한 공간과 팀 작업을 위한\n공간을 제공할 예정입니다.`}
              </p>
              <Image
                src="/ut-place.png"
                alt="ut-place"
                width={295}
                height={208}
              />
            </section>
            <section className="flex flex-col items-center">
              <h3 className="text-lg font-semibold text-i-secondary">
                UT 진행 방법
              </h3>
              <article className="mt-5 flex max-w-[295px] flex-col rounded-[20px] bg-[#222222] px-6 py-8">
                <ul className="flex flex-col gap-y-5 break-keep text-[#D3D3D3]">
                  <li className="flex gap-x-2 text-sm leading-[22px]">
                    <span>1.</span>
                    <p>UT는 1부, 2부로 팀을 나누어 진행됩니다.</p>
                  </li>
                  <li className="flex gap-x-2 text-sm leading-[22px]">
                    <span>2.</span>
                    <p>
                      {`1부 팀이 UT 부수를 운영하면,\n2부 팀은 모이다 홀에서 팀 작업을 진행합니다.`}
                    </p>
                  </li>
                  <li className="flex gap-x-2 text-sm leading-[22px]">
                    <span>3.</span>
                    <p>2부팀에서 각 팀당 2명의 테스터를 선출합니다.</p>
                  </li>
                  <li className="flex gap-x-2 text-sm leading-[22px]">
                    <span>4.</span>
                    <p>
                      {`선출된 테스터들은 1부 팀들의 부스를 순서대로\n방문하여 UT를 수행합니다. (각 부스 당 20분)`}
                    </p>
                  </li>
                  <li className="flex gap-x-2 text-sm leading-[22px]">
                    <span>5.</span>
                    <p>
                      {`2부에서 서로 교대하여 2부팀이 UT 부스를 운영하고,\n1부팀이 테스터가 되어 부스를 돌며 UT를 수행합니다.`}
                    </p>
                  </li>
                </ul>
              </article>
            </section>
            <section className="text-center">
              <h3 className="text-lg font-semibold text-i-secondary">
                UT 진행 방법 참고 이미지
              </h3>
              <p className="my-5 whitespace-pre-wrap text-sm text-[#D3D3D3]">
                {`테스터는 각 부스를 순차적으로 돌며\nUT를 수행합니다.`}
              </p>
              <Image
                src="/ut-procedure.png"
                alt="ut-procedure"
                width={295}
                height={208}
              />
            </section>
          </div>
        </section>
        <section className="pb-36 text-center">
          <h3 className="mb-8 text-2xl font-semibold">기타 안내</h3>
          <div className="text-sm text-[#D3D3D3]">
            <p className="mb-5 whitespace-pre-wrap text-sm leading-[22px]">
              {`출석 체크를 위해 ID카드는\n`}
              <span className="text-[#6E96FF]">
                세션이 끝난 후 꼭 반납해주세요.
              </span>
            </p>
            <p className="mb-5 whitespace-pre-wrap text-sm font-medium leading-[22px]">
              {`음식물 쓰레기통이 없는 관계로\n음식물은 최대한 반입을 지양해주세요.`}
            </p>
            <p className="whitespace-pre-wrap text-sm leading-[22px]">
              {`당일 비가 많이 오는 경우\n정문이 폐쇄되어 후문으로 입장해야 할 수 있습니다.`}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Invi;
