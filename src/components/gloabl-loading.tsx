"use client";

import { AnimatePresence, motion } from "framer-motion";
import { create } from "zustand";
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
          className="fixed inset-0 flex flex-col items-center justify-center gap-2 bg-background/95 animate-in"
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(2px)" }}
        >
          <img
            src="https://velog.velcdn.com/images/bepyan/post/3433ddb0-3b6d-43f0-8568-8d678f323b0b/image.png"
            alt="로딩중..."
            width={500}
            height={300}
            className="animate-head-shake"
            style={{ animationDuration: "5s" }}
          />
          {text && (
            <TextEffect className="pb-10 text-4xl font-bold">{text}</TextEffect>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
