import type {
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
  color: "black",
  textAlign: "left",
  fontWeight: "normal",
  fontSize: "16px",
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

export const initialEditorState: EditorState = {
  elements: [
    {
      content: [],
      id: "__body",
      name: "Body",
      styles: {},
      type: "__body",
    },
  ],
  selectedElement: emptyElement,
  currentTabValue: editorTabValue.ELEMENTS,
  device: "Mobile",
  isPreviewMode: false,
};

export const initialEditorHistory: EditorHistory = {
  history: [initialEditorState],
  currentIndex: 0,
};

export const initialEditor = {
  state: initialEditorState,
  history: initialEditorHistory,
};
