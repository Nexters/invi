"use client";

import { useForm } from "@tanstack/react-form";
import { useCallback, useEffect, useRef, useState } from "react";
import ImageRadio from "~/app/(playground)/pg/bottom-sheet/_components/image-radio";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

import { toast } from "sonner";
import AttendanceFalseDefault from "~/assets/attendance/attendance-false-default.svg";
import AttendanceTrueDefault from "~/assets/attendance/attendance-true-deafult.svg";
import { createInvitationResponses } from "~/lib/db/schema/invitation_response.query";

export default function BottomSheet() {
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      name: "",
      attendance: "" as "true" | "false" | "",
    },
    onSubmit: async ({ value }) => {
      const { name, attendance } = value;
      await createInvitationResponses({
        invitation_id: "4yZl98Z1JmInrHOANn3uj",
        participant_name: name,
        attendance: attendance === "true",
        reason: "",
      });
      toast("참여가 완료되었습니다.", {
        duration: 2000,
        style: {
          backgroundColor: "black",
          opacity: 0.9,
          height: "56px",
          color: "white",
          border: 0,
        },
      });
      setOpen(false);
    },
  });

  const sheetContentRef = useRef<HTMLDivElement | null>(null);
  const startY = useRef<number | null>(null);
  const scrollStartY = useRef<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const preventDefault = (e: Event) => {
      if (isDragging) {
        e.preventDefault();
      }
    };

    document.body.addEventListener("touchmove", preventDefault, {
      passive: false,
    });

    return () => {
      document.body.removeEventListener("touchmove", preventDefault);
    };
  }, [isDragging]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    scrollStartY.current = window.scrollY;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (startY.current === null || !sheetContentRef.current) return;

    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startY.current;

    if (deltaY > 0 && window.scrollY <= scrollStartY.current) {
      setIsDragging(true);
      sheetContentRef.current!.style.transform = `translateY(${deltaY}px)`;
      sheetContentRef.current!.style.transition = "none";
    } else {
      setIsDragging(false);
    }
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (startY.current === null || !sheetContentRef.current) return;

      const endY = e.changedTouches[0].clientY;
      const deltaY = endY - startY.current;

      sheetContentRef.current!.style.transform = "";
      sheetContentRef.current!.style.transition = "";

      if (deltaY > 100 && isDragging) {
        setOpen(false);
      }

      setIsDragging(false);
      startY.current = null;
    },
    [isDragging],
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto h-[127px] w-full max-w-2xl px-4 py-8">
          <Button
            variant="outline"
            className="h-full w-full rounded-xl border-none bg-[#5E8AFF] text-lg font-bold text-white"
            onClick={() => setOpen(true)}
          >
            세션 참여 조사하기
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="fixed w-full flex-col space-y-10 rounded-t-[32px] border-none bg-[#1A1A1A] pb-0 pt-10 text-white"
        aria-describedby={"세션참여 조사 Form"}
        ref={sheetContentRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute left-1/2 top-4 -translate-x-1/2 transform">
          <div className="h-1 w-10 rounded-full bg-[#EDEDED]"></div>
        </div>
        <SheetHeader>
          <SheetTitle className={"text-left text-2xl text-white"}>
            세션 참여 조사
          </SheetTitle>
        </SheetHeader>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="flex-grow overflow-y-auto">
            <div className="gap-4 pb-4">
              <div className="flex flex-col items-center space-y-4">
                <Label
                  htmlFor="name"
                  className="w-full text-left text-base font-semibold"
                >
                  이름
                </Label>
                <form.Field name="name">
                  {(field) => (
                    <Input
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      value={field.state.value}
                      className="col-span-3 h-[50px] rounded-xl border-[#3C3C3C] bg-[#222222] text-base focus:border-[#5E8AFF]"
                    />
                  )}
                </form.Field>
              </div>
            </div>
            <div className="grid gap-4 pb-1.5 pt-4">
              <div className="flex flex-row items-center gap-4">
                <form.Field name="attendance">
                  {(field) => (
                    <ImageRadio
                      name={field.name}
                      value={field.state.value}
                      onChange={(event) => {
                        field.handleChange(
                          event.target.value as "true" | "false" | "",
                        );
                      }}
                    >
                      <ImageRadio.Option
                        imageUrl={AttendanceTrueDefault}
                        value={"true"}
                        text={"참여"}
                        checked={field.state.value === "true"}
                      />
                      <ImageRadio.Option
                        imageUrl={AttendanceFalseDefault}
                        value={"false"}
                        text={"불참"}
                        checked={field.state.value === "false"}
                      />
                    </ImageRadio>
                  )}
                </form.Field>
              </div>
            </div>
          </div>
          <div className={"h-[127px] py-[34px]"}>
            <form.Subscribe selector={(state) => state}>
              {({ isValid, isSubmitting, values }) => {
                const isFormComplete =
                  isValid && values.name && values.attendance;
                return (
                  <Button
                    type="submit"
                    variant="outline"
                    disabled={!isFormComplete || isSubmitting}
                    className={`h-full w-full rounded-xl border-none bg-[#5E8AFF] text-lg font-bold text-white disabled:bg-[#D5D7D9]`}
                  >
                    제출하기
                  </Button>
                );
              }}
            </form.Subscribe>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
