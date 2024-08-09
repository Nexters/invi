import { emptyElement, initialEditor } from "~/components/editor/constant";
import type {
  DeviceType,
  Editor,
  EditorElement,
  EditorTabTypeValue,
} from "~/components/editor/type";
import { isValidSelectEditorElement } from "~/components/editor/util";

/**
 * Action Types
 */

type EditorActionMap = {
  ADD_ELEMENT: {
    containerId: string;
    elementDetails: EditorElement;
  };
  UPDATE_ELEMENT: {
    elementDetails: EditorElement;
  };
  DELETE_ELEMENT: {
    elementDetails: EditorElement;
  };
  CHANGE_CLICKED_ELEMENT: {
    elementDetails?: EditorElement;
  };
  CHANGE_CURRENT_TAB_VALUE: {
    value: EditorTabTypeValue;
  };
  CHANGE_DEVICE: {
    device: DeviceType;
  };
  TOGGLE_PREVIEW_MODE: undefined;
  REDO: undefined;
  UNDO: undefined;
};

export type EditorAction = {
  [K in keyof EditorActionMap]: {
    type: K;
  } & (EditorActionMap[K] extends undefined
    ? {}
    : { payload: EditorActionMap[K] });
}[keyof EditorActionMap];

/**
 * Action Helpers
 */

const updateEditorHistory = (
  editor: Editor,
  newState: Editor["state"],
): Editor => ({
  ...editor,
  state: newState,
  history: {
    ...editor.history,
    history: [
      ...editor.history.history.slice(0, editor.history.currentIndex + 1),
      { ...newState },
    ],
    currentIndex: editor.history.currentIndex + 1,
  },
});

const traverseElements = (
  elements: EditorElement[],
  callback: (element: EditorElement) => EditorElement | null,
): EditorElement[] => {
  return elements.reduce<EditorElement[]>((acc, element) => {
    const updatedElement = callback(element);
    if (updatedElement === null) {
      return acc;
    }

    if (Array.isArray(updatedElement.content)) {
      return [
        ...acc,
        {
          ...updatedElement,
          content: traverseElements(updatedElement.content, callback),
        },
      ];
    }

    return [...acc, updatedElement];
  }, []);
};

/**
 * Action Handlers
 */

const actionHandlers: {
  [K in EditorAction["type"]]: (
    editor: Editor,
    payload: EditorActionMap[K],
  ) => Editor;
} = {
  ADD_ELEMENT: (editor, payload) => {
    const newElements = traverseElements(editor.state.elements, (element) => {
      if (
        element.id === payload.containerId &&
        Array.isArray(element.content)
      ) {
        return {
          ...element,
          content: [...element.content, payload.elementDetails],
        };
      }
      return element;
    });

    return updateEditorHistory(editor, {
      ...editor.state,
      elements: newElements,
    });
  },

  UPDATE_ELEMENT: (editor, payload) => {
    const newElements = traverseElements(editor.state.elements, (element) => {
      if (element.id === payload.elementDetails.id) {
        return { ...element, ...payload.elementDetails };
      }
      return element;
    });

    const isSelectedElementUpdated =
      editor.state.selectedElement.id === payload.elementDetails.id;
    const newSelectedElement = isSelectedElementUpdated
      ? payload.elementDetails
      : editor.state.selectedElement;

    return updateEditorHistory(editor, {
      ...editor.state,
      elements: newElements,
      selectedElement: newSelectedElement,
    });
  },

  DELETE_ELEMENT: (editor, payload) => {
    const newElements = traverseElements(editor.state.elements, (element) => {
      if (element.id === payload.elementDetails.id) {
        return null;
      }
      return element;
    });

    return updateEditorHistory(editor, {
      ...editor.state,
      elements: newElements,
    });
  },

  CHANGE_CLICKED_ELEMENT: (editor, payload) => {
    const isSelected = isValidSelectEditorElement(payload.elementDetails);

    const newTabValue = isSelected
      ? "Element Settings"
      : editor.state.currentTabValue === "Element Settings"
        ? "Elements"
        : editor.state.currentTabValue;

    return updateEditorHistory(editor, {
      ...editor.state,
      selectedElement: payload.elementDetails || emptyElement,
      currentTabValue: newTabValue,
    });
  },

  CHANGE_CURRENT_TAB_VALUE: (editor, payload) => {
    return {
      ...editor,
      state: {
        ...editor.state,
        currentTabValue: payload.value,
      },
    };
  },

  CHANGE_DEVICE: (editor, payload) => {
    return {
      ...editor,
      state: {
        ...editor.state,
        device: payload.device,
      },
    };
  },

  TOGGLE_PREVIEW_MODE: (editor) => {
    return {
      ...editor,
      state: {
        ...editor.state,
        isPreviewMode: !editor.state.isPreviewMode,
      },
    };
  },

  REDO: (editor) => {
    if (editor.history.currentIndex < editor.history.history.length - 1) {
      const nextIndex = editor.history.currentIndex + 1;
      return {
        ...editor,
        state: { ...editor.history.history[nextIndex] },
        history: {
          ...editor.history,
          currentIndex: nextIndex,
        },
      };
    }
    return editor;
  },

  UNDO: (editor) => {
    if (editor.history.currentIndex > 0) {
      const prevIndex = editor.history.currentIndex - 1;
      return {
        ...editor,
        state: { ...editor.history.history[prevIndex] },
        history: {
          ...editor.history,
          currentIndex: prevIndex,
        },
      };
    }
    return editor;
  },
};

export const editorReducer = (
  editor = initialEditor,
  action: EditorAction,
): Editor => {
  const handler = actionHandlers[action.type];
  // @ts-expect-error: TypeScript cannot infer that the payload is correct for each action type
  return handler(editor, action?.payload);
};
