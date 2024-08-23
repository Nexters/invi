import { nanoid } from "nanoid";
import {
  accordionElement,
  blankElement,
  bodyElement,
  containerElement,
  elementNameMap,
  emptyElement,
  imageElement,
  kakaoMapElement,
  logoBannerElement,
  navigationElement,
  textElement,
  twoColumnElement,
} from "~/components/editor/constant";
import type {
  EditorElement,
  EditorElementType,
} from "~/components/editor/type";

export function isValidSelectEditorElement(element?: EditorElement) {
  return element?.id;
}

export function isContainerElement(element: EditorElement) {
  const containerMap = {
    __body: true,
    container: true,
    "2Col": true,
  } as const;

  return !!containerMap[element.type as keyof typeof containerMap];
}

export const getDefaultElement = <T extends EditorElementType>(
  type: T,
): Extract<EditorElement, { type: T }> => {
  const elementMap: {
    [K in EditorElementType]: Extract<EditorElement, { type: K }>;
  } = {
    container: containerElement,
    "2Col": twoColumnElement,
    blank: blankElement,
    text: textElement,
    image: imageElement,
    kakaoMap: kakaoMapElement,
    navigation: navigationElement,
    logoBanner: logoBannerElement,
    accordion: accordionElement,
    __body: bodyElement,
    empty: emptyElement,
  };

  return elementMap[type];
};

export const cloneElement = <T extends EditorElement>(element: T): T => {
  const clonedElement = { ...element, id: nanoid() };

  if (Array.isArray(clonedElement.content)) {
    clonedElement.content = clonedElement.content.map(cloneElement);
  }

  return clonedElement;
};

export const makeElement = <T extends EditorElementType>(
  type: T,
): Extract<EditorElement, { type: T }> => {
  const defaultElement = getDefaultElement(type);
  return cloneElement(defaultElement);
};

export const getElementName = (type: EditorElementType) => {
  return elementNameMap[type] ?? "";
};
