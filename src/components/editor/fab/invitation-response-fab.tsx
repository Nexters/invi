"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Drawer } from "vaul";
import AttendanceFalseDefault from "~/assets/attendance/attendance-false-default.svg";
import AttendanceTrueDefault from "~/assets/attendance/attendance-true-default.svg";
import ImageRadio from "~/components/editor/fab/image-radio";
import { useEditor } from "~/components/editor/provider";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { SheetHeader, SheetTitle } from "~/components/ui/sheet";
import { createInvitationResponses } from "~/lib/db/schema/invitation_response.query";

export default function InvitationResponseFab() {
  return (
    <Drawer.Root>
      <div className="absolute inset-x-0 bottom-0 z-50 mx-auto max-w-lg px-[28px] text-center">
        <Drawer.Trigger className="mb-5 h-[63px] w-[100%] select-none rounded-lg bg-[#5E8AFF] text-lg font-bold text-white active:scale-[0.98]">
          세션 참여 조사하기
        </Drawer.Trigger>
      </div>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/80" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mx-auto mt-24 flex h-auto max-w-lg flex-col rounded-t-[10px] border-none bg-[#1A1A1A] text-white">
          <Drawer.Handle className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
          <InvitationResponseForm />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function InvitationResponseForm() {
  const { editor } = useEditor();

  const form = useForm({
    defaultValues: {
      name: "",
      attendance: "",
    },
    onSubmit: async ({ value }) => {
      const { name, attendance } = value;
      await createInvitationResponses({
        invitation_id: editor.config.invitationId,
        participant_name: name,
        attendance: attendance.toLowerCase() === "true",
      });
      toast("참여가 완료되었습니다.", { duration: 2000 });
    },
  });

  return (
    <div className="h-[500px] bg-transparent p-5">
      <SheetHeader>
        <SheetTitle className="text-left text-2xl text-primary-foreground">
          세션 참여 조사
        </SheetTitle>
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
                  <Drawer.Close asChild>
                    <Button
                      type="submit"
                      variant="outline"
                      disabled={!isFormComplete || isSubmitting}
                      className={`h-full w-full rounded-xl border-none bg-[#5E8AFF] text-lg font-bold text-white disabled:bg-[#D5D7D9]`}
                    >
                      제출하기
                    </Button>
                  </Drawer.Close>
                );
              }}
            </form.Subscribe>
          </div>
        </form>
      </SheetHeader>
    </div>
  );
}
