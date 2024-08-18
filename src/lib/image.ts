import ky from "ky";

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  /**
   * @see /app/api/uploadImage/route.ts
   */
  const { url } = await ky
    .post("/api/uploadImage", {
      body: formData,
    })
    .json<{ url: string }>();

  return url;
}
