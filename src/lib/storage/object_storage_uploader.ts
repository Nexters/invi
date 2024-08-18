import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createReadStream } from "fs";
import { Readable } from "stream";
import { env } from "~/lib/env";

const endpoint = env.NCP_ENDPOINT;
const region = env.NCP_REGION;
const access_key = env.NCP_ACCESS_KEY;
const secret_key = env.NCP_SECRET_KEY;
const bucket_name = env.NCP_BUCKET_NAME;

const objectStorageClient = new S3Client({
  endpoint: endpoint,
  region: region,
  credentials: {
    accessKeyId: access_key,
    secretAccessKey: secret_key,
  },
});


async function uploadToObjectStorage(filePath: string) {
  try {
    const fileStream = createReadStream(filePath);
    await objectStorageClient.send(
      new PutObjectCommand({
        Bucket: bucket_name,
        Key: filePath,
        ACL: "public-read",
        Body: fileStream as Readable,
      })
    );
  } catch (error) {
    console.error("Error:", error);
  }
}
