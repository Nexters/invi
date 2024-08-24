import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(time: string | number | Date) {
  const now = new Date();
  const target = new Date(time);
  const diff = now.getTime() - target.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return `${seconds}초 전`;
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 10) return `${days}일 전`;
  return `${format(time, "yyyy.MM.dd")}`;
}

export function formatUTCtoKST(utcDateString: Date | string) {
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
