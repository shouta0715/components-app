import { NextResponse } from "next/server";
import { coerce, number, parse } from "valibot";
import { handleApiError } from "@/lib/errors";
import { searchCategories } from "@/services/category/get/search";

export const dynamic = "force-dynamic";

const NumberSchema = coerce(number(), Number);

function parseOffset(offset: string | null) {
  return parse(NumberSchema, offset);
}

const handler = async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q");
  const offset = searchParams.get("offset");

  try {
    const outputOffset = parseOffset(offset);

    const categories = await searchCategories(q, 10, outputOffset);
    const hasMore = categories.length >= 10;

    return NextResponse.json({ categories, hasMore }, { status: 200 });
  } catch (error) {
    return handleApiError({ error });
  }
};

export const GET = handler;
