"use client";

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
} from "react";
import { editorReducer, type EditorAction } from "~/components/editor/action";
import {
  initialEditor,
  initialEditorConfig,
} from "~/components/editor/constant";
import type {
  Editor,
  EditorConfig,
  EditorData,
} from "~/components/editor/type";

export const EditorContext = createContext<{
  editor: Editor;
  dispatch: Dispatch<EditorAction>;
}>({
  editor: initialEditor,
  dispatch: () => undefined,
});

export type EditorProps = {
  editorData?: Partial<EditorData>;
  editorConfig?: Partial<EditorConfig>;
  editorState?: Partial<Editor["state"]>;
};

export type EditorProviderProps = EditorProps & {
  children: React.ReactNode;
};

export default function EditorProvider({
  children,
  editorConfig,
  editorData,
  editorState,
}: EditorProviderProps) {
  const initialData = useMemo(() => {
    return {
      ...initialEditor.data,
      ...editorData,
    };
  }, [editorData]);

  const [editor, dispatch] = useReducer(editorReducer, {
    ...initialEditor,
    history: {
      ...initialEditor.history,
      list: [initialData],
    },
    data: initialData,
    config: {
      ...initialEditorConfig,
      ...editorConfig,
    },
    state: {
      ...initialEditor.state,
      ...editorState,
    },
  });

  return (
    <EditorContext.Provider value={{ editor, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
}

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor Hook must be used within the editor Provider");
  }
  return context;
};
