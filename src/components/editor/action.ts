import {
  emptyElement,
  initialEditor,
  initialEditorState,
} from "~/components/editor/constant";
import type {
  DeviceType,
  Editor,
  EditorElement,
  EditorTabTypeValue,
} from "~/components/editor/type";
import { isValidSelectEditorElement } from "~/components/editor/util";

export type EditorAction =
  | {
      type: "ADD_ELEMENT";
      payload: {
        containerId: string;
        elementDetails: EditorElement;
      };
    }
  | {
      type: "UPDATE_ELEMENT";
      payload: {
        elementDetails: EditorElement;
      };
    }
  | {
      type: "DELETE_ELEMENT";
      payload: {
        elementDetails: EditorElement;
      };
    }
  | {
      type: "CHANGE_CLICKED_ELEMENT";
      payload: {
        elementDetails?: EditorElement;
      };
    }
  | {
      type: "CHANGE_CURRENT_TAB_VALUE";
      payload: {
        value: EditorTabTypeValue;
      };
    }
  | {
      type: "CHANGE_DEVICE";
      payload: {
        device: DeviceType;
      };
    }
  | {
      type: "TOGGLE_PREVIEW_MODE";
    }
  | { type: "REDO" }
  | { type: "UNDO" }
  | {
      type: "LOAD_DATA";
      payload: {
        elements: EditorElement[];
      };
    };

const addAnElement = (
  editorArray: EditorElement[],
  action: EditorAction,
): EditorElement[] => {
  if (action.type !== "ADD_ELEMENT")
    throw Error(
      "You sent the wrong action type to the Add Element editor State",
    );
  return editorArray.map((item) => {
    if (item.id === action.payload.containerId && Array.isArray(item.content)) {
      return {
        ...item,
        content: [...item.content, action.payload.elementDetails],
      };
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: addAnElement(item.content, action),
      };
    }
    return item;
  });
};

const updateAnElement = (
  editorArray: EditorElement[],
  action: EditorAction,
): EditorElement[] => {
  if (action.type !== "UPDATE_ELEMENT") {
    throw Error("You sent the wrong action type to the update Element State");
  }
  return editorArray.map((item) => {
    if (item.id === action.payload.elementDetails.id) {
      return { ...item, ...action.payload.elementDetails };
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: updateAnElement(item.content, action),
      };
    }
    return item;
  });
};

const deleteAnElement = (
  editorArray: EditorElement[],
  action: EditorAction,
): EditorElement[] => {
  if (action.type !== "DELETE_ELEMENT")
    throw Error(
      "You sent the wrong action type to the Delete Element editor State",
    );
  return editorArray.filter((item) => {
    if (item.id === action.payload.elementDetails.id) {
      return false;
    } else if (item.content && Array.isArray(item.content)) {
      item.content = deleteAnElement(item.content, action);
    }
    return true;
  });
};

export const editorReducer = (
  editor = initialEditor,
  action: EditorAction,
): Editor => {
  switch (action.type) {
    case "ADD_ELEMENT":
      const updatedEditorState = {
        ...editor.state,
        elements: addAnElement(editor.state.elements, action),
      };
      // Update the history to include the entire updated EditorState
      const updatedHistory = [
        ...editor.history.history.slice(0, editor.history.currentIndex + 1),
        { ...updatedEditorState }, // Save a copy of the updated state
      ];

      const newEditorState = {
        ...editor,
        state: updatedEditorState,
        history: {
          ...editor.history,
          history: updatedHistory,
          currentIndex: updatedHistory.length - 1,
        },
      };

      return newEditorState;

    case "UPDATE_ELEMENT":
      // Perform your logic to update the element in the state
      const updatedElements = updateAnElement(editor.state.elements, action);

      const UpdatedElementIsSelected =
        editor.state.selectedElement.id === action.payload.elementDetails.id;

      const updatedEditorStateWithUpdate = {
        ...editor.state,
        elements: updatedElements,
        selectedElement: UpdatedElementIsSelected
          ? action.payload.elementDetails
          : {
              id: "",
              content: [],
              name: "",
              styles: {},
              type: null,
            },
      };

      const updatedHistoryWithUpdate = [
        ...editor.history.history.slice(0, editor.history.currentIndex + 1),
        { ...updatedEditorStateWithUpdate }, // Save a copy of the updated state
      ];
      const updatedEditor = {
        ...editor,
        state: updatedEditorStateWithUpdate,
        history: {
          ...editor.history,
          history: updatedHistoryWithUpdate,
          currentIndex: updatedHistoryWithUpdate.length - 1,
        },
      };
      return updatedEditor;

    case "DELETE_ELEMENT":
      // Perform your logic to delete the element from the state
      const updatedElementsAfterDelete = deleteAnElement(
        editor.state.elements,
        action,
      );
      const updatedEditorStateAfterDelete = {
        ...editor.state,
        elements: updatedElementsAfterDelete,
      };
      const updatedHistoryAfterDelete = [
        ...editor.history.history.slice(0, editor.history.currentIndex + 1),
        { ...updatedEditorStateAfterDelete }, // Save a copy of the updated state
      ];

      const deletedState = {
        ...editor,
        state: updatedEditorStateAfterDelete,
        history: {
          ...editor.history,
          history: updatedHistoryAfterDelete,
          currentIndex: updatedHistoryAfterDelete.length - 1,
        },
      };
      return deletedState;

    case "CHANGE_CLICKED_ELEMENT":
      const isSelected = isValidSelectEditorElement(
        action.payload.elementDetails,
      );

      const clickedState: Editor = {
        ...editor,
        state: {
          ...editor.state,
          selectedElement: action.payload.elementDetails || emptyElement,
          currentTabValue: isSelected
            ? "Element Settings"
            : editor.state.currentTabValue === "Element Settings"
              ? "Elements"
              : editor.state.currentTabValue,
        },
        history: {
          ...editor.history,
          history: [
            ...editor.history.history.slice(0, editor.history.currentIndex + 1),
            { ...editor.state }, // Save a copy of the current editor state
          ],
          currentIndex: editor.history.currentIndex + 1,
        },
      };
      return clickedState;

    case "CHANGE_CURRENT_TAB_VALUE":
      return {
        ...editor,
        state: {
          ...editor.state,
          currentTabValue: action.payload.value,
        },
      };

    case "CHANGE_DEVICE":
      const changedDeviceState: Editor = {
        ...editor,
        state: {
          ...editor.state,
          device: action.payload.device,
        },
      };
      return changedDeviceState;

    case "TOGGLE_PREVIEW_MODE":
      const toggleState: Editor = {
        ...editor,
        state: {
          ...editor.state,
          isPreviewMode: !editor.state.isPreviewMode,
        },
      };
      return toggleState;

    case "REDO":
      if (editor.history.currentIndex < editor.history.history.length - 1) {
        const nextIndex = editor.history.currentIndex + 1;
        const nextEditorState = { ...editor.history.history[nextIndex] };
        const redoState: Editor = {
          ...editor,
          state: nextEditorState,
          history: {
            ...editor.history,
            currentIndex: nextIndex,
          },
        };
        return redoState;
      }
      return editor;

    case "UNDO":
      if (editor.history.currentIndex > 0) {
        const prevIndex = editor.history.currentIndex - 1;
        const prevEditorState = { ...editor.history.history[prevIndex] };
        const undoState: Editor = {
          ...editor,
          state: prevEditorState,
          history: {
            ...editor.history,
            currentIndex: prevIndex,
          },
        };
        return undoState;
      }
      return editor;

    case "LOAD_DATA":
      return {
        ...initialEditor,
        state: {
          ...initialEditor.state,
          elements: action.payload.elements || initialEditorState.elements,
        },
      };

    default:
      return editor;
  }
};
