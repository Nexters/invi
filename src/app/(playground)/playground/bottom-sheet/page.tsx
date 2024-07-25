import BottomSheet from "~/app/(playground)/playground/bottom-sheet/_components/bottom-sheet";
import { AMain } from "~/app/(playground)/playground/inner-tools";

export default function BottomSheetPage() {
  return (
    <AMain className="flex min-h-screen w-full flex-col bg-[#1A1A1A]">
      <div className={"h-[1200px] text-white"}>scroll fixed test</div>
      <BottomSheet />
    </AMain>
  );
}
