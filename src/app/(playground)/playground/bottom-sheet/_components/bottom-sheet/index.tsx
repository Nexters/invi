"use client";

import { useForm } from "@tanstack/react-form";
import ImageRadio from "~/app/(playground)/playground/bottom-sheet/_components/image-radio";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import {
  Sheet,
  SheetClose,
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
  const form = useForm({
    defaultValues: {
      name: "",
      attendance: "" as "true" | "false" | "",
    },
    onSubmit: async ({ value }) => {
      const { name, attendance } = value;
      await createInvitationResponses(name, attendance as unknown as boolean);
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
    },
  });

  return (
    <Sheet key={"bottom"}>
      <SheetTrigger asChild>
        <div
          className={
            "fixed bottom-0 left-0 right-0 mx-auto h-[127px] w-full max-w-2xl px-4 py-8"
          }
        >
          <Button
            variant="outline"
            className={
              "h-full w-full rounded-xl border-none bg-[#5E8AFF] text-lg font-bold text-white"
            }
          >
            세션 참여 조사하기
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="fixed w-full flex-col space-y-10 rounded-t-[32px] border-none bg-[#1A1A1A] pb-0 pt-10 text-white"
        aria-describedby={"세션참여 조사 Form"}
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
                    <>
                      <Input
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        value={field.state.value}
                        className="col-span-3 h-[50px] rounded-xl border-[#3C3C3C] bg-[#222222] focus:border-[#5E8AFF]"
                      />
                    </>
                  )}
                </form.Field>
              </div>
            </div>
            <div className="grid gap-4 pb-1.5 pt-4">
              <div className="flex flex-row items-center gap-4">
                <form.Field name="attendance">
                  {(field) => (
                    <>
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
                    </>
                  )}
                </form.Field>
              </div>
            </div>
          </div>
          <SheetClose asChild>
            <div className={"h-[127px] py-[34px]"}>
              <form.Subscribe selector={(state) => state}>
                {({ isValid, isSubmitting, errors, values }) => {
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
          </SheetClose>
        </form>
      </SheetContent>
    </Sheet>
  );
}
