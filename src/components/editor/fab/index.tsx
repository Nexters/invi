"use client";

import InvitationResponseFab from "~/components/editor/fab/invitation-response-fab";
import { useEditor } from "~/components/editor/provider";

export default function FloatingActionButton() {
  const { editor } = useEditor();

  switch (editor.data.fab.type) {
    case "invitation_response":
      return <InvitationResponseFab />;
    default:
      return null;
  }
}
