import type { EditorElement } from "~/components/editor/type";

export function isValidSelectEditorElement(element?: EditorElement) {
  return element?.id;
}
