import Editor from "~/components/editor";
import { bodyElement } from "~/components/editor/constant";

export default async function Page() {
  return (
    <Editor
      editorConfig={{ backLink: "/pg" }}
      editorData={{
        elements: [
          {
            ...bodyElement,
            content: [
              {
                id: "logoBanner",
                type: "logoBanner",
                styles: {
                  height: 69,
                  color: "#22222250",
                },
                content: {},
              },
              {
                id: "blank",
                type: "blank",
                styles: {
                  height: 32,
                },
                content: {},
              },
              {
                id: "container",
                type: "container",
                styles: {
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
                },
                content: [
                  {
                    id: "text",
                    type: "text",
                    styles: {
                      textAlign: "left",
                    },
                    content: {
                      innerText: "Hello World",
                    },
                  },
                ],
              },
            ],
          },
        ],
      }}
    />
  );
}
