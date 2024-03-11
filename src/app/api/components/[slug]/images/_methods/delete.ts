import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth/handlers";
import { s3 } from "@/lib/aws";
import { PREVIEW_BUCKET_NAME } from "@/lib/constant";
import { NotFoundError, handleApiError } from "@/lib/errors";

import { getDeletePreviewComponent } from "@/services/components/get/previews";
import { Params } from "@/types/next";

export const dynamic = "force-dynamic";

const handler = async (_: NextRequest, { params }: Params) => {
  try {
    const user = await getSessionUser();

    const component = await getDeletePreviewComponent(params.slug);

    if (!component) throw new NotFoundError();

    const { previewUrl, creatorId } = component;

    if (creatorId !== user.id) throw new NotFoundError();

    if (!previewUrl) return new Response(null, { status: 204 });

    const command = new DeleteObjectCommand({
      Bucket: PREVIEW_BUCKET_NAME,
      Key: previewUrl,
    });

    await s3.send(command);

    return new Response(null, { status: 204 });
  } catch (error) {
    return handleApiError({ error });
  }
};

export const DELETE = handler;
