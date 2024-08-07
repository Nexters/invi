"use client";

import { useEditor } from "~/components/editor/provider";
import { Accordion } from "~/components/ui/accordion";

type Props = {};

export default function SidebarSettingsTab(props: Props) {
  const { editor, dispatch } = useEditor();

  return (
    <Accordion
      type="multiple"
      className="w-full border-t"
      defaultValue={[]}
    ></Accordion>
  );
}
