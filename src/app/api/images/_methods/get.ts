import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { NextRequest } from "next/server";
import { v4 as UUID } from "uuid";
import { getSessionUser } from "@/lib/auth/handlers";
import { s3 } from "@/lib/aws";
import { PREVIEW_BUCKET_NAME, S3_MAX_FILE_SIZE } from "@/lib/constant";
import { BadRequestError, handleApiError } from "@/lib/errors";
import { validate } from "@/lib/validation";
import { imageExtensions } from "@/types/file";

export const dynamic = "force-dynamic";

const handler = async (req: NextRequest) => {
  try {
    await getSessionUser();

    const { searchParams } = req.nextUrl;
    const type = searchParams.get("type");
    const extension = searchParams.get("extension");

    if (!type || !extension) throw new BadRequestError();
    validate(extension, imageExtensions);

    const uuid = UUID();

    const { url, fields } = await createPresignedPost(s3, {
      Bucket: PREVIEW_BUCKET_NAME,
      Key: `${uuid}.${extension}`,
      Fields: {
        "Content-Type": type,
      },
      Expires: 6000,
      Conditions: [["content-length-range", 0, S3_MAX_FILE_SIZE]],
    });

    const data = {
      id: uuid,
      url,
      fields,
    };

    return Response.json({ data }, { status: 200 });
  } catch (error) {
    return handleApiError({ error });
  }
};

export const GET = handler;
