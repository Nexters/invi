"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Drawer } from "vaul";
import { SheetHeader, SheetTitle } from "~/components/ui/sheet";

export default function InvitationResponseFab() {
  return (
    <Drawer.Root>
      <div className="absolute inset-x-0 bottom-0 z-50 mx-auto max-w-lg text-center">
        <Drawer.Trigger className="h-[63px] w-[100%] rounded-t-lg bg-blue-300 text-primary-foreground">
          세션 참여 조사하기
        </Drawer.Trigger>
      </div>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/80" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mx-auto mt-24 flex h-auto max-w-lg flex-col rounded-t-[10px] border bg-background">
          <Drawer.Handle className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
          <InvitationResponseForm />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function InvitationResponseForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      attendance: "",
    },
    onSubmit: async ({ value }) => {
      const { name, attendance } = value;
      console.log(name, attendance);
      // await createInvitationResponses(name, attendance as unknown as boolean);
      toast("참여가 완료되었습니다.", { duration: 2000 });
    },
  });

  return (
    <div className="h-[400px] p-5">
      <SheetHeader>
        <SheetTitle className="text-left text-2xl">세션 참여 조사</SheetTitle>
      </SheetHeader>
    </div>
  );
}
