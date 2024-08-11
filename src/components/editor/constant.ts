import type {
  EditorElement,
  EditorHistory,
  EditorState,
} from "~/components/editor/type";

export const defaultStyles: React.CSSProperties = {
  backgroundPosition: "center",
  objectFit: "cover",
  backgroundRepeat: "no-repeat",
  textAlign: "left",
  opacity: "100%",
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
