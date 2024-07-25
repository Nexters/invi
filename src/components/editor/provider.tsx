"use client";

import { createContext, useContext, useReducer, type Dispatch } from "react";
import { editorReducer, type EditorAction } from "~/components/editor/action";
import { initialEditor } from "~/components/editor/constant";
import type { Editor } from "~/components/editor/type";

export const EditorContext = createContext<{
  editor: Editor;
  dispatch: Dispatch<EditorAction>;
  pageDetails: any;
}>({
  editor: initialEditor,
  dispatch: () => undefined,
  pageDetails: null,
});

export default function EditorProvider(props: {
  children: React.ReactNode;
  pageDetails: any;
}) {
  const [editor, dispatch] = useReducer(editorReducer, initialEditor);

  return (
    <EditorContext.Provider
      value={{
        editor,
        dispatch,
        pageDetails: props.pageDetails,
      }}
    >
      {props.children}
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
