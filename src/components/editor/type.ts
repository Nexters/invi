export type DeviceType = "Desktop" | "Mobile" | "Tablet";

export type EditorElementType =
  | "__body"
  | "container"
  | "2Col"
  | "text"
  | "section"
  | "image"
  | null;

export type EditorElement = {
  id: string;
  styles: React.CSSProperties;
  name: string;
  type: EditorElementType;
  content:
    | EditorElement[]
    | { href?: string; innerText?: string; src?: string };
};

export type EditorState = {
  elements: EditorElement[];
  selectedElement: EditorElement;
  device: DeviceType;
  isPreviewMode: boolean;
  funnelPageId: string;
};

export type EditorHistory = {
  history: EditorState[];
  currentIndex: number;
};

export type Editor = {
  state: EditorState;
  history: EditorHistory;
};
