"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { create } from "zustand";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { Test } from "~/lib/db/schema/test";
import { updateTest } from "~/lib/db/schema/test.query";
import { useOptimisticMutation } from "~/lib/hooks/use-optimistic-mutation";

type TestEditDialogStore = {
  isOpen: boolean;
  data: Test;
  openDialog: (test: Test) => void;
  closeDialog: () => void;
};

export const useTestEditDialog = create<TestEditDialogStore>((set) => ({
  isOpen: false,
  data: {
    id: 0,
    name: "",
    email: "",
    number: 0,
  },
  openDialog: (test) => set({ isOpen: true, data: test }),
  closeDialog: () => set({ isOpen: false }),
}));

export default function TestEditDialog() {
  const { data, isOpen, closeDialog } = useTestEditDialog();

  const { mutate, isPending } = useOptimisticMutation({
    mutationFn: updateTest,
    queryKey: ["tests"],
    updater: (state: Test[]) => {
      const newState = [...state];
      const index = newState.findIndex((test) => test.id === data.id);
      newState[index] = data;
      return;
    },
    invalidates: ["tests"],
  });

  const form = useForm({
    defaultValues: data,
    onSubmit: ({ value }) => {
      mutate(value);
      closeDialog();
      toast.success("수정되었습니다.");
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => !isOpen && closeDialog()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Test</DialogTitle>
          <DialogDescription>
            {`Make changes to your Test here. Click save when you're done.`}
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4 py-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">ID</Label>
            <Input defaultValue={data.id} className="col-span-3" disabled />
          </div>
          <form.Field
            name="name"
            children={(field) => (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={field.name} className="text-right">
                  이름
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="col-span-3"
                />
              </div>
            )}
          />
          <form.Field
            name="email"
            children={(field) => (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={field.name} className="text-right">
                  이메일
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="col-span-3"
                />
              </div>
            )}
          />
          <form.Field
            name="number"
            children={(field) => (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={field.name} className="text-right">
                  숫자
                </Label>
                <Input
                  type="number"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                  className="col-span-3"
                />
              </div>
            )}
          />
        </form>
        <DialogFooter>
          <Button disabled={isPending} onClick={form.handleSubmit}>
            수정하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
