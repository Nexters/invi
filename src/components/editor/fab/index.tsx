"use client";

import BottomSheet from "~/app/(playground)/pg/bottom-sheet/_components/bottom-sheet";
import { useEditor } from "~/components/editor/provider";

export default function FloatingActionButton() {
  const { editor } = useEditor();

  switch (editor.data.fab.type) {
    case "invitation_response":
      return <BottomSheet />;
    default:
      return null;
  }
}
