import { editorTabValue } from "~/components/editor/constant";

export type DeviceType = "Desktop" | "Mobile" | "Tablet";

export type EditorTabTypeValue =
  (typeof editorTabValue)[keyof typeof editorTabValue];

type BaseEditorElement = {
  id: string;
  name: string;
  styles: React.CSSProperties;
};

type EditorElementContentMap = {
  __body: EditorElement[];
  container: EditorElement[];
  "2Col": EditorElement[];
  text: { innerText: string };
  image: { src: string; alt?: string };
  map: { address: string };
};

export type EditorElementType = keyof EditorElementContentMap;

export type EditorElement = {
  [K in EditorElementType]: BaseEditorElement & {
    type: K;
    content: EditorElementContentMap[K];
  };
}[EditorElementType];

export type InferEditorElement<K extends EditorElementType> = Extract<
  EditorElement,
  { type: K }
>;

export type EditorState = {
  elements: EditorElement[];
  selectedElement: EditorElement;
  currentTabValue: EditorTabTypeValue;
  device: DeviceType;
  isPreviewMode: boolean;
};

export type EditorHistory = {
  history: EditorState[];
  currentIndex: number;
};

export type Editor = {
  state: EditorState;
  history: EditorHistory;
};
