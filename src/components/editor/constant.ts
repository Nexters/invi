import { nanoid } from "nanoid";
import type {
  Editor,
  EditorConfig,
  EditorData,
  EditorElement,
  EditorHistory,
  EditorState,
} from "~/components/editor/type";

const defaultStyles: React.CSSProperties = {};

export const containerDefaultStyles: React.CSSProperties = {
  ...defaultStyles,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  paddingTop: 10,
  paddingRight: 10,
  paddingBottom: 10,
  paddingLeft: 10,
  width: "100%",
  height: "auto",
};

export const textDefaultStyles: React.CSSProperties = {
  ...defaultStyles,
  textAlign: "left",
};

export const kakaoMapDefaultStyles: React.CSSProperties = {
  ...defaultStyles,
  textAlign: "center",
};

export const editorTabValue = {
  ELEMENTS: "Elements",
  SETTINGS: "Settings",
  INVITATION_RESPONSE: "Invitation Response",
  ELEMENT_SETTINGS: "Element Settings",
} as const;

export const emptyElement = {
  id: "",
  content: [],
  name: "",
  styles: {},
  type: "empty",
} satisfies EditorElement;

export const bodyElement = {
  content: [],
  id: "__body",
  name: "Body",
  styles: {
    paddingLeft: 28,
    paddingRight: 28,
  },
  type: "__body",
} satisfies EditorElement;

export const initialEditorData: EditorData = {
  elements: [bodyElement],
  fab: {
    type: "invitation_response",
  },
};

export const initialEditorState: EditorState = {
  selectedElement: emptyElement,
  currentTabValue: editorTabValue.ELEMENTS,
  device: "Mobile",
  isPreviewMode: false,
};

export const initialEditorHistory: EditorHistory = {
  list: [initialEditorData],
  currentIndex: 0,
};

const tempId = nanoid(8);

export const initialEditorConfig: EditorConfig = {
  backLink: "./",
  invitationId: tempId,
  invitationTitle: "제목 없음",
  invitationDesc: "여기를 눌러 링크를 확인하세요.",
  invitationThumbnail: "",
  invitationSubdomain: tempId,
};

export const initialEditor: Editor = {
  state: initialEditorState,
  history: initialEditorHistory,
  data: initialEditorData,
  config: initialEditorConfig,
};
