import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUTCtoKST(utcDateString: Date) {
  const date = new Date(utcDateString);

  const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  const formatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Seoul",
  });

  const formattedDate = formatter
    .format(kstDate)
    .replace(/\. /g, "-") // 연-월-일 사이의 구분자를 '-'로 변경
    .replace(/\./g, "") // 연-월-일 뒤의 '.' 제거
    .replace(/(\d{4}-\d{2}-\d{2}) (\d{2})(\d{2})(\d{2})/, "$1 $2:$3:$4"); // 시간 부분에 ':' 추가

  return formattedDate;
}
