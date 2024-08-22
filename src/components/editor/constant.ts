import { nanoid } from "nanoid";
import type {
  Editor,
  EditorConfig,
  EditorData,
  EditorHistory,
  EditorState,
  InferEditorElement,
} from "~/components/editor/type";

/**
 * element constants
 */

export const emptyElement: InferEditorElement<"empty"> = {
  id: "",
  type: "empty",
  name: "",
  styles: {},
  content: [],
};

export const bodyElement: InferEditorElement<"__body"> = {
  id: "__body",
  type: "__body",
  name: "Body",
  styles: {
    paddingLeft: 28,
    paddingRight: 28,
  },
  content: [],
};

export const containerDefaultStyles: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  paddingTop: 10,
  paddingRight: 10,
  paddingBottom: 10,
  paddingLeft: 10,
  width: "100%",
  height: "auto",
};

export const containerElement: InferEditorElement<"container"> = {
  id: "__container",
  type: "container",
  name: "Container",
  styles: containerDefaultStyles,
  content: [],
};

export const twoColumnElement: InferEditorElement<"2Col"> = {
  id: "__2col",
  type: "2Col",
  name: "Two Columns",
  styles: containerDefaultStyles,
  content: [
    {
      ...containerElement,
      id: "__2col__container_1",
      styles: { ...containerDefaultStyles, width: "100%" },
    },
    {
      ...containerElement,
      id: "__2col__container_2",
      styles: { ...containerDefaultStyles, width: "100%" },
    },
  ],
};

export const blankElement: InferEditorElement<"blank"> = {
  id: "__blank",
  type: "blank",
  name: "Blank",
  styles: {
    height: 32,
  },
  content: [],
};

export const textDefaultStyles: React.CSSProperties = {
  textAlign: "left",
};

export const textElement: InferEditorElement<"text"> = {
  id: "__text",
  type: "text",
  name: "Text",
  styles: textDefaultStyles,
  content: {
    innerText: "여기에 내용을 입력하세요.",
  },
};

export const imageElement: InferEditorElement<"image"> = {
  id: "__image",
  type: "image",
  name: "Image",
  styles: {
    width: "100%",
    height: "auto",
  },
  content: {
    src: "",
    alt: "",
  },
};

export const kakaoMapDefaultStyles: React.CSSProperties = {
  textAlign: "center",
};

export const kakaoMapElement: InferEditorElement<"kakaoMap"> = {
  id: "__kakaoMap",
  type: "kakaoMap",
  name: "KaKao Map",
  styles: kakaoMapDefaultStyles,
  content: {
    location: {
      latitude: 37.566828,
      longitude: 126.9786567,
    },
    address: "서울 중구 세종대로 110 서울특별시청",
    isMapUse: true,
    isShareUse: true,
  },
};

export const navigationElement: InferEditorElement<"navigation"> = {
  id: "__navigation",
  type: "navigation",
  name: "Navigation",
  styles: {},
  content: {
    address: "서울역",
  },
};

export const logoBannerElement: InferEditorElement<"logoBanner"> = {
  id: "__logoBanner",
  type: "logoBanner",
  name: "Logo Banner",
  styles: {
    height: 69,
    color: "#22222250",
  },
  content: {},
};

export const accordionElement: InferEditorElement<"accordion"> = {
  id: "__accordion",
  type: "accordion",
  name: "Accordion",
  styles: {},
  content: {
    triggerText: "제목",
    triggerStyle: {
      color: "#09090B",
    },
    containerStyle: {
      backgroundColor: "#F4F4F5",
    },
    innerContainer: {
      ...containerElement,
      id: nanoid(),
      styles: {
        ...containerDefaultStyles,
        gap: 0,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
      },
      content: [
        {
          ...textElement,
          id: nanoid(),
          content: {
            innerText: "내용",
          },
        },
      ],
    },
  },
};

/**
 * editor constants
 */

export const editorTabValue = {
  ELEMENTS: "도구상자",
  SETTINGS: "초대장 설정",
  INVITATION_RESPONSE: "초대 응답 설정",
  ELEMENT_SETTINGS: "도구 설정",
} as const;

export const initialEditorData: EditorData = {
  elements: [bodyElement],
  fab: {
    type: "invitation_response",
  },
};

export const initialEditorState: EditorState = {
  selectedElement: emptyElement,
  currentTabValue: editorTabValue.ELEMENTS,
  device: "Mobile",
  isPreviewMode: false,
  isDragging: false,
  draggedElementId: "",
};

export const initialEditorHistory: EditorHistory = {
  list: [initialEditorData],
  currentIndex: 0,
};

const tempId = nanoid(8);

export const initialEditorConfig: EditorConfig = {
  backLink: "./",
  invitationId: tempId,
  invitationTitle: "제목 없음",
  invitationDesc: "여기를 눌러 링크를 확인하세요.",
  invitationThumbnail: "",
  invitationSubdomain: tempId,
};

export const initialEditor: Editor = {
  state: initialEditorState,
  history: initialEditorHistory,
  data: initialEditorData,
  config: initialEditorConfig,
};
