"use client";

import { useForm } from "@tanstack/react-form";
import ImageRadio from "~/app/(playground)/playground/bottom-sheet/_components/image-radio";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

import AttendanceFalseActive from "~/assets/attendance/attendance-false-active.svg";
import AttendanceFalseDefault from "~/assets/attendance/attendance-false-default.svg";
import AttendanceTrueActive from "~/assets/attendance/attendance-true-active.svg";
import AttendanceTrueDefault from "~/assets/attendance/attendance-true-default.svg";

const schema = z.object({
  name: z.string().min(1, "이름을 입력해주세요"),
  attendance: z.enum(["true", "false"], {
    required_error: "참석 여부를 선택해주세요",
  }),
});

export default function BottomSheet() {
  const form = useForm({
    defaultValues: {
      name: "",
      attendance: "" as "true" | "false" | "",
    },
    validatorAdapter: zodValidator(schema),
    onSubmit: async ({ value }) => {
      console.log(value);
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
              "h-full w-full rounded-xl border-none bg-[#5E8AFF] text-lg text-white"
            }
          >
            세션 참여 조사하기
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="fixed w-full flex-col space-y-10 rounded-t-[32px] border-none bg-[#1A1A1A] pb-0 pt-10 text-white"
      >
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
                <Label htmlFor="name" className="w-full text-left text-base">
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
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                      >
                        <ImageRadio.Option
                          imageUrl={
                            field.state.value === "true"
                              ? AttendanceTrueActive
                              : AttendanceTrueDefault
                          }
                          value={"true"}
                          text={"참여"}
                          checked={field.state.value === "true"}
                        />
                        <ImageRadio.Option
                          imageUrl={
                            field.state.value === "false"
                              ? AttendanceFalseActive
                              : AttendanceFalseDefault
                          }
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
          <div className={"h-[127px] py-[34px]"}>
            <SheetClose asChild>
              <form.Subscribe selector={(state) => state}>
                {({ isValid, isSubmitting, errors, values }) => {
                  const isFormComplete =
                    isValid &&
                    !errors["name"] &&
                    !errors["attendance"] &&
                    values.name &&
                    values.attendance;
                  return (
                    <Button
                      type="submit"
                      variant="outline"
                      disabled={!isFormComplete || isSubmitting}
                      className={`h-full w-full rounded-xl border-none bg-[#5E8AFF] text-lg text-white disabled:bg-[#D5D7D9]`}
                    >
                      제출하기
                    </Button>
                  );
                }}
              </form.Subscribe>
            </SheetClose>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
