import { createHash, timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const hash = (value: string) => createHash("sha256").update(value).digest();

/** Called by the admin project after a save, so pages show new content without a redeploy. */
export const POST = (request: NextRequest) => {
  const secret = process.env.REVALIDATE_SECRET;
  const provided = request.headers.get("x-revalidate-secret");

  if (!secret || !provided || !timingSafeEqual(hash(secret), hash(provided))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidatePath("/", "layout");

  return NextResponse.json({ revalidated: true });
};
