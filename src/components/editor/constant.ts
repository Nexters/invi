import { nanoid } from "nanoid";
import type {
  Editor,
  EditorConfig,
  EditorData,
  EditorElementType,
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
  styles: {},
  content: [],
};

export const bodyElement: InferEditorElement<"__body"> = {
  id: "__body",
  type: "__body",
  styles: {
    paddingLeft: 28,
    paddingRight: 28,
  },
  content: [],
};

export const containerDefaultStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  paddingTop: 20,
  paddingRight: 24,
  paddingBottom: 20,
  paddingLeft: 24,
  width: "100%",
  height: "auto",
};

export const containerElement: InferEditorElement<"container"> = {
  id: "__container",
  type: "container",
  styles: containerDefaultStyles,
  content: [],
};

export const twoColumnElement: InferEditorElement<"2Col"> = {
  id: "__2col",
  type: "2Col",
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
  styles: {
    height: "32px",
  },
  content: [],
};

export const textDefaultStyles: React.CSSProperties = {
  textAlign: "left",
};

export const textElement: InferEditorElement<"text"> = {
  id: "__text",
  type: "text",
  styles: textDefaultStyles,
  content: {
    innerText: "여기에 내용을 입력하세요.",
  },
};

export const imageElement: InferEditorElement<"image"> = {
  id: "__image",
  type: "image",
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
  styles: kakaoMapDefaultStyles,
  content: {
    location: {
      latitude: 37.566828,
      longitude: 126.9786567,
    },
    address: "서울 중구 세종대로 110 서울특별시청",
    isMapUse: true,
    isShareUse: false,
  },
};

export const navigationElement: InferEditorElement<"navigation"> = {
  id: "__navigation",
  type: "navigation",
  styles: {},
  content: {
    address: "서울역",
  },
};

export const logoBannerElement: InferEditorElement<"logoBanner"> = {
  id: "__logoBanner",
  type: "logoBanner",
  styles: {
    height: 69,
    color: "#22222250",
  },
  content: {},
};

export const accordionElement: InferEditorElement<"accordion"> = {
  id: "__accordion",
  type: "accordion",
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
        paddingBottom: 24,
        paddingLeft: 24,
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
 * mapper for element types
 */

export const elementNameMap: Record<EditorElementType, string> = {
  __body: "페이지",
  "2Col": "2Col",
  container: "컨테이너",
  blank: "공백",
  text: "텍스트",
  image: "이미지",
  kakaoMap: "지도",
  navigation: "길찾기",
  logoBanner: "인비 로고",
  accordion: "펼침/접힘",
  empty: "",
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
