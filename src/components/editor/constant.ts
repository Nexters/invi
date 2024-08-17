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

export const editorTabValue = {
  ELEMENTS: "Elements",
  SETTINGS: "Settings",
  ELEMENT_SETTINGS: "Element Settings",
} as const;

export const emptyElement = {
  id: "",
  content: [],
  name: "",
  styles: {},
  type: "empty",
} satisfies EditorElement;

export const initialEditorData: EditorData = [
  {
    content: [],
    id: "__body",
    name: "Body",
    styles: {},
    type: "__body",
  },
];

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

export const initialEditor: Editor = {
  state: initialEditorState,
  history: initialEditorHistory,
  data: initialEditorData,
};

const tempId = nanoid(8);

export const initialEditorConfig: EditorConfig = {
  backLink: "./",
  invitationId: tempId,
  invitationTitle: "제목 없음",
  invitationSubdomain: tempId,
};
