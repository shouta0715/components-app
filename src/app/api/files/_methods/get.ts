import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth/handlers";
import { s3 } from "@/lib/aws";
import { PUBLIC_BUCKET_NAME, S3_MAX_FILE_SIZE } from "@/lib/constant";
import { BadRequestError, handleApiError } from "@/lib/errors";
import { validate } from "@/lib/validation";
import { extensions } from "@/types/file";
import { getContentType } from "@/utils";

export const dynamic = "force-dynamic";

const handler = async (req: NextRequest) => {
  try {
    await getSessionUser();

    const { searchParams } = req.nextUrl;

    const extension = searchParams.get("extension");
    const key = searchParams.get("key");

    if (!extension || !key) throw new BadRequestError();
    validate(extension, extensions);

    const { url, fields } = await createPresignedPost(s3, {
      Bucket: PUBLIC_BUCKET_NAME,
      Key: `${key}.${extension}`,
      Fields: {
        "Content-Type": getContentType(extension),
      },
      Expires: 300,
      Conditions: [["content-length-range", 0, S3_MAX_FILE_SIZE]],
    });

    const data = {
      id: key,
      url,
      fields,
    };

    return Response.json({ data });
  } catch (error) {
    return handleApiError({ error });
  }
};

export const GET = handler;
