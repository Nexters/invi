import Editor from "~/components/editor";

export default async function Page() {
  return (
    <Editor
      editorConfig={{ backLink: "/pg" }}
      editorData={[
        {
          id: "__body",
          type: "__body",
          name: "Body",
          styles: {},
          content: [
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
      ]}
    />
  );
}
