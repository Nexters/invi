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
                name: "Logo Banner",
                type: "logoBanner",
                styles: {
                  height: 69,
                  color: "#22222250",
                },
                content: {},
              },
              {
                id: "blank",
                name: "Blank",
                type: "blank",
                styles: {
                  height: 32,
                },
                content: {},
              },
              {
                id: "container",
                name: "Container",
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
                    name: "Text",
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
