import { editorTabValue } from "~/components/editor/constant";

export type DeviceType = "Desktop" | "Mobile" | "Tablet";

export type EditorTabTypeValue =
  (typeof editorTabValue)[keyof typeof editorTabValue];

type EditorElementContentMap = {
  __body: EditorElement[];
  container: EditorElement[];
  "2Col": EditorElement[];
  text: { innerText: string };
  image: { src: string; alt?: string };
  kakaoMap: {
    address: string;
    location: {
      latitude: number;
      longitude: number;
    };
    isMapUse: boolean;
    isShareUse: boolean;
  };
  map: { address: string };
  blank: {};
  empty: {};
};

export type EditorElementType = keyof EditorElementContentMap;

export type EditorElement = {
  [K in EditorElementType]: {
    type: K;
    id: string;
    name: string;
    styles: React.CSSProperties;
    content: EditorElementContentMap[K];
  };
}[EditorElementType];

export type InferEditorElement<K extends EditorElementType> = Extract<
  EditorElement,
  { type: K }
>;

export type EditorState = {
  selectedElement: EditorElement;
  currentTabValue: EditorTabTypeValue;
  device: DeviceType;
  isPreviewMode: boolean;
};

export type EditorData = EditorElement[];

export type EditorHistory = {
  list: EditorData[];
  currentIndex: number;
};

export type Editor = {
  state: EditorState;
  history: EditorHistory;
  data: EditorData;
};

export type EditorConfig = {
  backLink: string;
  invitationId: string;
  invitationTitle: string;
  invitationSubdomain: string;
};
