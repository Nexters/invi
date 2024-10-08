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
  navigation: { address: string };
  blank: {};
  empty: {};
  logoBanner: {};
  accordion: {
    triggerText?: string;
    triggerStyle?: React.CSSProperties;
    containerStyle?: React.CSSProperties;
    contentStyle?: React.CSSProperties;
    innerContainer: InferEditorElement<"container">;
  };
  share: {};
};

export type EditorElementType = keyof EditorElementContentMap;

export type EditorElement = {
  [K in EditorElementType]: {
    type: K;
    id: string;
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
  isDragging: boolean;
  draggedElementId: string;
};

export type EditorData = {
  elements: EditorElement[];
  fab: {
    type: "" | "invitation_response";
  };
};

export type EditorHistory = {
  list: EditorData[];
  currentIndex: number;
};

export type EditorConfig = {
  backLink: string;
  invitationId: string;
  invitationTitle: string;
  invitationDesc: string;
  invitationThumbnail: string;
  invitationSubdomain: string;
};

export type Editor = {
  state: EditorState;
  history: EditorHistory;
  data: EditorData;
  config: EditorConfig;
};
