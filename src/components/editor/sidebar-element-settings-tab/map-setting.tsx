"use client";

import { useEditor } from "~/components/editor/provider";
import type { InferEditorElement } from "~/components/editor/type";
import { Input } from "~/components/ui/input";

type Props = { element: InferEditorElement<"map"> };

export default function MapSetting({ element }: Props) {
  const { dispatch } = useEditor();

  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...element,
          type: "map",
          content: {
            ...element.content,
            address: e.target.value,
          },
        },
      },
    });
  };

  return (
    <div className="border-t p-6 pt-4">
      <h4 className="mb-3 text-sm font-medium">주소</h4>
      <div>
        <Input
          id="address"
          placeholder="Enter your address"
          onChange={handleAddressInputChange}
          value={element.content?.address}
        />
      </div>
    </div>
  );
}
