import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createReadStream } from "fs";
import { Readable } from "stream";
import { env } from "~/lib/env";

const endpoint = env.NCP_ENDPOINT;
const region = env.NCP_REGION;
const access_key = env.NCP_ACCESS_KEY;
const secret_key = env.NCP_SECRET_KEY;
const bucket_name = env.NCP_BUCKET_NAME;

const s3Client = new S3Client({
  endpoint: endpoint,
  region: region,
  credentials: {
    accessKeyId: access_key,
    secretAccessKey: secret_key,
  },
});


async function uploadToS3(file_path: string) {
  try {
    const folderName = "sample-folder/";
    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucket_name,
        Key: folderName,
      })
    );
    console.log(`Folder created: ${folderName}`);

    const fileName = "static/테스트.txt";
    const fileStream = createReadStream(file_path);
    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucket_name,
        Key: fileName,
        ACL: "public-read",
        Body: fileStream as Readable,
      })
    );
    console.log(`File uploaded: ${fileName}`);
  } catch (error) {
    console.error("Error:", error);
  }
}
