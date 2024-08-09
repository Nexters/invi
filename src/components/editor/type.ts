import { editorTabValue } from "~/components/editor/constant";

export type DeviceType = "Desktop" | "Mobile" | "Tablet";

export type EditorElementType =
  | "__body"
  | "container"
  | "2Col"
  | "text"
  | "section"
  | "image"
  | "map"
  | null;

export type EditorTabTypeValue =
  (typeof editorTabValue)[keyof typeof editorTabValue];

export type EditorElement = {
  id: string;
  styles: React.CSSProperties;
  name: string;
  type: EditorElementType;
  content:
    | EditorElement[]
    | { href?: string; innerText?: string; src?: string; address?: string };
};

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
