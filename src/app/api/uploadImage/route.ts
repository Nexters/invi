import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import ky from "ky";

const endpoint = "https://kr.object.ncloudstorage.com";
const region = "kr-standard";
const access_key = "ncp_iam_BPAMKR1FnZHrkPDEjofp";
const secret_key = "ncp_iam_BPKMKR4NS4tVApUg2rTjbzyT6da7lEOmrr";
const bucket_name = "invi-static";

const objectStorageClient = new S3Client({
  endpoint: endpoint,
  region: region,
  credentials: {
    accessKeyId: access_key,
    secretAccessKey: secret_key,
  },
});

async function createPresignedUrl(
  key: string,
  expiresInSeconds: number = 3600,
) {
  const command = new PutObjectCommand({
    Bucket: bucket_name,
    Key: key,
    ACL: "public-read",
  });

  const presignedUrl = await getSignedUrl(objectStorageClient, command, {
    expiresIn: expiresInSeconds,
  });

  return presignedUrl;
}

async function uploadUsingPresignedUrlWithFile(
  presignedUrl: string,
  file: File,
) {
  try {
    const fileStream = file.stream();

    const response = await ky.put(presignedUrl, {
      body: fileStream,
    });

    console.log(response);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}

async function fetchFile(url: string) {
  const response = await ky.get(url);
  const blob = await response.blob();
  const file = new File([blob], "image.png", { type: "image/png" });
  return file;
}

export async function POST(request: Request) {
  const contentType = request.headers.get("Content-Type");
  try {
    if (contentType?.includes("application/json")) {
      const res = await request.json();
      const file = await fetchFile(res.url);
      const presignedUrl = await createPresignedUrl(file.name);
      uploadUsingPresignedUrlWithFile(presignedUrl, file);
    } else if (contentType?.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File;
      const presignedUrl = await createPresignedUrl(file.name);
      uploadUsingPresignedUrlWithFile(presignedUrl, file);
    }
  } catch (error) {
    console.error("Error uploading file:", error);
  }

  return Response.json({ message: "File uploaded successfully" });
}
