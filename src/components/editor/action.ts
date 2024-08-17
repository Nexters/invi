import { emptyElement } from "~/components/editor/constant";
import type {
  DeviceType,
  Editor,
  EditorConfig,
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
  MOVE_ELEMENT: {
    elementId: string;
    newParentId: string;
    newIndex: number;
  };
  MOVE_ELEMENT_UP: {
    elementId: string;
  };
  MOVE_ELEMENT_DOWN: {
    elementId: string;
  };
  UPDATE_ELEMENT: {
    elementDetails: EditorElement;
  };
  UPDATE_ELEMENT_STYLE: React.CSSProperties;
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
  UPDATE_CONFIG: Partial<EditorConfig>;
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
  newData: Editor["data"],
  newSelectedElement: EditorElement = emptyElement,
): Editor => ({
  ...editor,
  state: {
    ...editor.state,
    selectedElement: newSelectedElement,
  },
  data: newData,
  history: {
    ...editor.history,
    list: [
      ...editor.history.list.slice(0, editor.history.currentIndex + 1),
      { ...newData },
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
        } as EditorElement,
      ];
    }

    return [...acc, updatedElement];
  }, []);
};

const findElementAndParent = (
  elements: EditorElement[],
  elementId: string,
): [EditorElement | null, EditorElement | null, number] => {
  for (const el of elements) {
    if (el.id === elementId) {
      return [el, null, -1];
    }
    if (Array.isArray(el.content)) {
      const index = el.content.findIndex((child) => child.id === elementId);
      if (index !== -1) {
        return [el.content[index], el, index];
      }
      const [foundEl, foundParent, foundIndex] = findElementAndParent(
        el.content,
        elementId,
      );
      if (foundEl) {
        return [foundEl, foundParent, foundIndex];
      }
    }
  }
  return [null, null, -1];
};

const removeElementFromParent = (
  elements: EditorElement[],
  elementId: string,
): [EditorElement[], EditorElement | null] => {
  let removedElement: EditorElement | null = null;
  const newData = elements.map((el) => {
    if (Array.isArray(el.content)) {
      const index = el.content.findIndex((child) => child.id === elementId);
      if (index !== -1) {
        removedElement = el.content[index];
        return {
          ...el,
          content: [
            ...el.content.slice(0, index),
            ...el.content.slice(index + 1),
          ],
        };
      }
      const [newContent, removed] = removeElementFromParent(
        el.content,
        elementId,
      );
      if (removed) {
        removedElement = removed;
        return { ...el, content: newContent };
      }
    }
    return el;
  }) as EditorElement[];
  return [newData, removedElement];
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
    const newData = traverseElements(editor.data, (element) => {
      if (
        element.id === payload.containerId &&
        Array.isArray(element.content)
      ) {
        return {
          ...element,
          content: [...element.content, payload.elementDetails],
        } as EditorElement;
      }
      return element;
    });

    return updateEditorHistory(editor, newData);
  },

  MOVE_ELEMENT: (editor, payload) => {
    const { elementId, newParentId, newIndex } = payload;

    const [elements, removedElement] = removeElementFromParent(
      editor.data,
      elementId,
    );
    if (!removedElement) return editor;

    const insertElement = (els: EditorElement[]): EditorElement[] => {
      return els.map((el) => {
        if (el.id === newParentId && Array.isArray(el.content)) {
          const newContent = [...el.content];
          newContent.splice(newIndex, 0, removedElement);
          return { ...el, content: newContent };
        }
        if (Array.isArray(el.content)) {
          return { ...el, content: insertElement(el.content) };
        }
        return el;
      }) as EditorElement[];
    };

    const newData = insertElement(elements);

    return updateEditorHistory(editor, newData, removedElement);
  },

  MOVE_ELEMENT_UP: (editor, payload) => {
    const { elementId } = payload;
    const [element, parent, currentIndex] = findElementAndParent(
      editor.data,
      elementId,
    );
    if (
      !element ||
      !parent ||
      !Array.isArray(parent.content) ||
      currentIndex <= 0
    )
      return editor;

    return actionHandlers.MOVE_ELEMENT(editor, {
      elementId,
      newParentId: parent.id,
      newIndex: currentIndex - 1,
    });
  },

  MOVE_ELEMENT_DOWN: (editor, payload) => {
    const { elementId } = payload;
    const [element, parent, currentIndex] = findElementAndParent(
      editor.data,
      elementId,
    );
    if (
      !element ||
      !parent ||
      !Array.isArray(parent.content) ||
      currentIndex === parent.content.length - 1
    )
      return editor;

    return actionHandlers.MOVE_ELEMENT(editor, {
      elementId,
      newParentId: parent.id,
      newIndex: currentIndex + 1,
    });
  },

  UPDATE_ELEMENT: (editor, payload) => {
    const newData = traverseElements(editor.data, (element) => {
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

    return updateEditorHistory(editor, newData, newSelectedElement);
  },

  UPDATE_ELEMENT_STYLE: (editor, payload) => {
    return actionHandlers.UPDATE_ELEMENT(editor, {
      elementDetails: {
        ...editor.state.selectedElement,
        styles: {
          ...editor.state.selectedElement.styles,
          ...payload,
        },
      },
    });
  },

  DELETE_ELEMENT: (editor, payload) => {
    const newData = traverseElements(editor.data, (element) => {
      if (element.id === payload.elementDetails.id) {
        return null;
      }
      return element;
    });

    return updateEditorHistory(editor, newData);
  },

  CHANGE_CLICKED_ELEMENT: (editor, payload) => {
    const isValidSelect = isValidSelectEditorElement(payload.elementDetails);

    const newTabValue = isValidSelect
      ? "Element Settings"
      : editor.state.currentTabValue === "Element Settings"
        ? "Elements"
        : editor.state.currentTabValue;

    return {
      ...editor,
      state: {
        ...editor.state,
        selectedElement: payload.elementDetails ?? emptyElement,
        currentTabValue: newTabValue,
      },
    };
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

  UPDATE_CONFIG: (editor, payload) => {
    return {
      ...editor,
      config: {
        ...editor.config,
        ...payload,
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
    if (editor.history.currentIndex < editor.history.list.length - 1) {
      const nextIndex = editor.history.currentIndex + 1;
      return {
        ...editor,
        data: { ...editor.history.list[nextIndex] },
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
        data: { ...editor.history.list[prevIndex] },
        history: {
          ...editor.history,
          currentIndex: prevIndex,
        },
      };
    }
    return editor;
  },
};

export const editorReducer = (editor: Editor, action: EditorAction): Editor => {
  const handler = actionHandlers[action.type];
  // @ts-expect-error: TypeScript cannot infer that the payload is correct for each action type
  return handler(editor, action?.payload);
};
