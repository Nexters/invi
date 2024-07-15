"use client";

import { create } from "zustand";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";

type AlertDialogOptions = {
  title: string;
  description?: string;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
};

type AlertDialogStore = AlertDialogOptions & {
  isOpen: boolean;
  openDialog: (options: AlertDialogOptions) => void;
  closeDialog: () => void;
};

export const useAlertDialogStore = create<AlertDialogStore>((set) => ({
  isOpen: false,
  title: "",
  confirmText: "확인",
  onConfirm: () => true,
  openDialog: (options) => set({ isOpen: true, ...options }),
  closeDialog: () => set({ isOpen: false }),
}));

export const GlobalAlert = () => {
  const {
    isOpen,
    title,
    description,
    confirmText,
    cancelText,
    onConfirm,
    closeDialog,
  } = useAlertDialogStore();

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(isOpen) => !isOpen && closeDialog()}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {cancelText && <AlertDialogCancel>{cancelText}</AlertDialogCancel>}
          <AlertDialogAction onClick={onConfirm}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
