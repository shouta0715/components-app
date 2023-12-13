import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { PresignedPost, createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { getSignedUrl as GetSignedUrl } from "@aws-sdk/s3-request-presigner";

import { Extension } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { BUCKET_NAME } from "@/lib/constant";

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  throw new Error("AWS credentials not found");
}

const s3Client = new S3Client({
  region: "us-east-1",
  endpoint: "http://127.0.0.1:9000",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
  forcePathStyle: true,
});

export const getSignedPostUrl = async (
  contentType: string,
  fileExtension: Extension | "png",
  bucket: BUCKET_NAME
): Promise<PresignedPost & { id: string }> => {
  const id = uuidv4();

  const command = await createPresignedPost(s3Client, {
    Bucket: bucket,
    Key: `${id}.${fileExtension}`,
    Conditions: [
      ["content-length-range", 0, 10485760], // up to 10 MB
      ["starts-with", "$Content-Type", contentType],
    ],
    Fields: {
      "Content-Type": contentType,
    },
    Expires: 600,
  });

  return {
    id,
    ...command,
  };
};

export const getSignedFileUrl = async (
  filename: string,
  bucket: BUCKET_NAME
) => {
  const command = new GetObjectCommand({
    Bucket: `${bucket}`,
    Key: filename,
  });

  const url = await GetSignedUrl(s3Client, command, {
    expiresIn: 600,
  });

  return url;
};
