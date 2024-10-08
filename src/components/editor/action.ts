import { nanoid } from "nanoid";
import { editorTabValue, emptyElement } from "~/components/editor/constant";
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
  ADD_ELEMENT_NEAR_BY: {
    elementId: string;
    elementDetails: EditorElement;
  };
  MOVE_ELEMENT: {
    elementId: string;
    newParentId: string;
    newIndex: number;
  };
  MOVE_ELEMENT_NEAR_BY: {
    elementId: string;
    targetId: string;
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
  DUPLICATE_ELEMENT: {
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
  /**
   * elementId, empty string for not dragging
   */
  SET_DRAGGING: string;
  TOGGLE_PREVIEW_MODE: undefined;
  REDO: undefined;
  UNDO: undefined;
  UPDATE_FAB_STATE: {
    type: "" | "invitation_response";
  };
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
  data: Partial<Editor["data"]>,
  newSelectedElement: EditorElement = emptyElement,
): Editor => {
  const newData = { ...editor.data, ...data };

  return {
    ...editor,
    state: {
      ...editor.state,
      selectedElement: newSelectedElement,
      currentTabValue: editorTabValue.ELEMENT_SETTINGS,
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
  };
};

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

const findParentId = (
  elements: EditorElement[],
  targetId: string,
): string | null => {
  for (const el of elements) {
    if (Array.isArray(el.content)) {
      if (el.content.some((child) => child.id === targetId)) {
        return el.id;
      }
      const foundInChild = findParentId(el.content, targetId);
      if (foundInChild) return foundInChild;
    }
  }
  return null;
};

const deepCloneElement = (element: EditorElement): EditorElement => {
  const newElement = { ...element, id: nanoid() };

  if (Array.isArray(element.content)) {
    newElement.content = element.content.map((child) =>
      deepCloneElement(child),
    );
  }

  return newElement;
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
    const newElement = payload.elementDetails;

    const elements = traverseElements(editor.data.elements, (element) => {
      if (
        element.id === payload.containerId &&
        Array.isArray(element.content)
      ) {
        return {
          ...element,
          content: [...element.content, newElement],
        } as EditorElement;
      }
      return element;
    });

    return updateEditorHistory(editor, { elements }, newElement);
  },

  ADD_ELEMENT_NEAR_BY: (editor, payload) => {
    const targetId = payload.elementId;
    const newElement = payload.elementDetails;

    const addElementNearBy = (elements: EditorElement[]): EditorElement[] => {
      return elements.reduce<EditorElement[]>((acc, element) => {
        if (element.id === targetId) {
          return [...acc, element, newElement];
        }

        if (Array.isArray(element.content)) {
          const updatedContent = addElementNearBy(element.content);
          return [
            ...acc,
            { ...element, content: updatedContent } as EditorElement,
          ];
        }
        return [...acc, element];
      }, []);
    };

    const newElements = addElementNearBy(editor.data.elements);

    return updateEditorHistory(editor, { elements: newElements }, newElement);
  },

  MOVE_ELEMENT: (editor, payload) => {
    const { elementId, newParentId, newIndex } = payload;

    const [elements, removedElement] = removeElementFromParent(
      editor.data.elements,
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

    const newElements = insertElement(elements);

    return updateEditorHistory(
      editor,
      { elements: newElements },
      removedElement,
    );
  },

  MOVE_ELEMENT_NEAR_BY: (editor, payload) => {
    const { elementId, targetId } = payload;

    if (targetId === "__body") {
      const bodyContents = editor.data.elements[0].content as EditorElement[];

      return actionHandlers.MOVE_ELEMENT(editor, {
        elementId,
        newParentId: targetId,
        newIndex: bodyContents.length,
      });
    }

    const [_, targetParent, targetIndex] = findElementAndParent(
      editor.data.elements,
      targetId,
    );

    if (!targetParent) {
      console.error("Target parent not found");
      return editor;
    }

    return actionHandlers.MOVE_ELEMENT(editor, {
      elementId,
      newParentId: targetParent.id,
      newIndex: targetIndex + 1,
    });
  },

  MOVE_ELEMENT_UP: (editor, payload) => {
    const { elementId } = payload;
    const [element, parent, currentIndex] = findElementAndParent(
      editor.data.elements,
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
      editor.data.elements,
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
    const elements = traverseElements(editor.data.elements, (element) => {
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

    return updateEditorHistory(editor, { elements }, newSelectedElement);
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
    const elements = traverseElements(editor.data.elements, (element) => {
      if (element.id === payload.elementDetails.id) {
        return null;
      }
      return element;
    });

    return updateEditorHistory(editor, { elements });
  },

  DUPLICATE_ELEMENT: (editor, payload) => {
    const [targetElement, parent, targetIndex] = findElementAndParent(
      editor.data.elements,
      payload.elementDetails.id,
    );

    if (!parent || targetIndex === -1) {
      return editor;
    }

    const newElement = deepCloneElement(payload.elementDetails);

    const elements = traverseElements(editor.data.elements, (element) => {
      if (element.id === parent.id && Array.isArray(element.content)) {
        return {
          ...element,
          content: [
            ...element.content.slice(0, targetIndex + 1),
            newElement,
            ...element.content.slice(targetIndex + 1),
          ],
        } as EditorElement;
      }
      return element;
    });

    return updateEditorHistory(editor, { elements }, newElement);
  },

  CHANGE_CLICKED_ELEMENT: (editor, payload) => {
    const isValidSelect = isValidSelectEditorElement(payload.elementDetails);

    const newTabValue = isValidSelect
      ? editorTabValue.ELEMENT_SETTINGS
      : editor.state.currentTabValue === editorTabValue.ELEMENT_SETTINGS
        ? editorTabValue.ELEMENTS
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

  SET_DRAGGING: (editor, payload) => {
    return {
      ...editor,
      state: {
        ...editor.state,
        isDragging: !!payload,
        draggedElementId: payload,
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
        state: {
          ...editor.state,
          selectedElement: emptyElement,
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
        state: {
          ...editor.state,
          selectedElement: emptyElement,
        },
      };
    }
    return editor;
  },

  UPDATE_FAB_STATE: (editor, payload) => {
    return {
      ...editor,
      data: {
        ...editor.data,
        fab: {
          type: payload.type,
        },
      },
    };
  },
};

export const editorReducer = (editor: Editor, action: EditorAction): Editor => {
  const handler = actionHandlers[action.type];
  // @ts-expect-error: TypeScript cannot infer that the payload is correct for each action type
  return handler(editor, action?.payload);
};
