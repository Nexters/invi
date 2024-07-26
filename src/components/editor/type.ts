export type DeviceType = "Desktop" | "Mobile" | "Tablet";

export type EditorElementType =
  | "text"
  | "container"
  | "section"
  | "contactForm"
  | "paymentForm"
  | "link"
  | "2Col"
  | "video"
  | "__body"
  | "image"
  | null
  | "3Col";

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
