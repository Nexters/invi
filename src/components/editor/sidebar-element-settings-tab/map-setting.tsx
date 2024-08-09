"use client";

import { useEditor } from "~/components/editor/provider";
import { Input } from "~/components/ui/input";

// TODO: Fix type safety
type Props = { element: any };

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
    <div className="border-t px-6 py-4">
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
