import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/lib/aws";
import { PUBLIC_BUCKET_NAME } from "@/lib/constant";

export async function deleteAWSFiles(keys: string[]) {
  const Objects = keys.map((Key) => ({ Key }));

  const command = new DeleteObjectsCommand({
    Bucket: PUBLIC_BUCKET_NAME,
    Delete: {
      Objects,
    },
  });

  const result = await s3.send(command);

  const hasError = result.Errors && result.Errors.length > 0;

  if (hasError) {
    throw new Error("Failed to delete files from s3");
  }
}
