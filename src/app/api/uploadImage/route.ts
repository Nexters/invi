import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import ky from "ky";
import { nanoid } from "nanoid";
import { getAuth } from "~/lib/auth/utils";
import { env } from "~/lib/env";
import { thumbnail } from "~/lib/thumbnail";

const objectStorageClient = new S3Client({
  endpoint: env.NCP_ENDPOINT,
  region: env.NCP_REGION,
  credentials: {
    accessKeyId: env.NCP_ACCESS_KEY,
    secretAccessKey: env.NCP_SECRET_KEY,
  },
});

async function createPresignedUrl(
  key: string,
  expiresInSeconds: number = 3600,
) {
  const command = new PutObjectCommand({
    Bucket: env.NCP_BUCKET_NAME,
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
  const fileStream = file.stream();

  await ky.put(presignedUrl, {
    body: fileStream,
  });
}

export async function POST(request: Request) {
  const auth = await getAuth();

  if (!auth.user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const contentType = request.headers.get("Content-Type");

  if (!contentType?.includes("multipart/form-data")) {
    return Response.json(
      { message: "multipart/form-data is required" },
      { status: 400 },
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    console.log(":filetype:", file.type);
    const fileEx = file.name.split(".").pop();

    const filePath = `${auth.user.id}/${nanoid(8)}.${fileEx}`;
    const presignedUrl = await createPresignedUrl(filePath);
    await uploadUsingPresignedUrlWithFile(presignedUrl, file);

    return Response.json({
      url: thumbnail(filePath),
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return Response.json({ message: "Error uploading file" }, { status: 500 });
  }
}
