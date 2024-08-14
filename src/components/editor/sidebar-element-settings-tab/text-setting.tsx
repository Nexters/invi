import {
  FontBoldIcon,
  FontFamilyIcon,
  FontSizeIcon,
} from "@radix-ui/react-icons";
import { useEditor } from "~/components/editor/provider";
import { IconInput } from "~/components/editor/ui/input";
import TextAlignToggleGroup from "~/components/editor/ui/text-align-toggle-group";

export default function TextSetting() {
  const { editor, dispatch } = useEditor();
  const element = editor.state.selectedElement;

  const handleOnChanges = (e: any) => {
    const styleSettings = e.target.id;
    const styleValue = e.target.value;

    dispatch({
      type: "UPDATE_ELEMENT_STYLE",
      payload: {
        [styleSettings]: styleValue,
      },
    });
  };

  return (
    <div className="space-y-1 border-t p-6 pt-4">
      <div className="flex h-10 items-center">
        <h4 className="text-sm font-medium">글 설정</h4>
      </div>
      <div className="grid w-full grid-cols-9 gap-1">
        <div className="col-span-4 flex items-start">
          <TextAlignToggleGroup
            value={element.styles.textAlign ?? "left"}
            onChangeValue={(newValue) =>
              dispatch({
                type: "UPDATE_ELEMENT_STYLE",
                payload: { textAlign: newValue },
              })
            }
          />
        </div>
        <div className="col-span-8">
          <IconInput
            id="fontFamily"
            value={element.styles.fontFamily ?? "Pretendard"}
            onChange={handleOnChanges}
            icon={<FontFamilyIcon />}
          />
        </div>
        <div className="col-span-4">
          <IconInput
            id="fontWeight"
            value={element.styles.fontWeight ?? "normal"}
            onChange={handleOnChanges}
            icon={<FontBoldIcon />}
          />
        </div>
        <div className="col-span-4">
          <IconInput
            id="fontSize"
            type="number"
            value={element.styles.fontSize ?? 16}
            onChange={(e) => {
              dispatch({
                type: "UPDATE_ELEMENT_STYLE",
                payload: {
                  fontSize: e.target.valueAsNumber,
                },
              });
            }}
            icon={<FontSizeIcon />}
          />
        </div>
        <div className="col-span-4">
          <IconInput
            id="color"
            value={element.styles.color ?? "inherit"}
            onChange={handleOnChanges}
            icon={
              <div
                className="h-3.5 w-3.5 rounded ring-1 ring-border"
                style={{ background: element.styles.color }}
              />
            }
          />
        </div>
      </div>
    </div>
  );
}
