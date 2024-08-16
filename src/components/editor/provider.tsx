"use client";

import { createContext, useContext, useReducer, type Dispatch } from "react";
import { editorReducer, type EditorAction } from "~/components/editor/action";
import {
  initialEditor,
  initialEditorConfig,
} from "~/components/editor/constant";
import type { Editor, EditorConfig } from "~/components/editor/type";

export const EditorContext = createContext<{
  editor: Editor;
  editorConfig: EditorConfig;
  dispatch: Dispatch<EditorAction>;
}>({
  editor: initialEditor,
  editorConfig: initialEditorConfig,
  dispatch: () => undefined,
});

export type EditorProps = {
  editorConfig?: Partial<EditorConfig>;
};

export type EditorProviderProps = EditorProps & {
  children: React.ReactNode;
};

export default function EditorProvider({
  children,
  editorConfig,
}: EditorProviderProps) {
  const [editor, dispatch] = useReducer(editorReducer, initialEditor);

  return (
    <EditorContext.Provider
      value={{
        editor,
        dispatch,
        editorConfig: { ...initialEditorConfig, ...editorConfig },
      }}
    >
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
