"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { create } from "zustand";
import MainImage from "~/assets/main.png";
import { TextEffect } from "~/components/core/text-effect";

type LoadingStore = {
  text?: string;
  isOpen: boolean;
  open: (text?: string) => void;
  close: () => void;
};

export const useLoadingStore = create<LoadingStore>((set) => ({
  isOpen: false,
  open: (text) => set({ isOpen: true, text }),
  close: () => set({ isOpen: false }),
}));

export default function GlobalLoading() {
  const { text, isOpen } = useLoadingStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999] flex select-none flex-col items-center justify-center gap-10 bg-background/95 animate-in"
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(2px)" }}
        >
          <Image
            src={MainImage}
            alt="로딩중"
            width={185}
            height={269}
            className="animate-head-shake p-4 dark:bg-white"
            style={{ animationDuration: "5s" }}
            draggable={false}
          />
          {text && (
            <TextEffect className="pb-10 text-2xl font-bold">{text}</TextEffect>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
