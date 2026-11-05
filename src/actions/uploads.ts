"use server";

import { requireAdmin } from "@/utils/supabase-server";
import { AwsClient } from "aws4fetch";
import { randomUUID } from "node:crypto";

const EXTENSIONS: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
};

const UPLOAD_LINK_SECONDS = 600;

/**
 * Signs a short-lived upload link so the browser sends the file straight to R2.
 * Hosting limits on request size rule out sending images through a server action.
 */
export const createUploadUrl = async (contentType: string) => {
  await requireAdmin();

  const { R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET, R2_PUBLIC_URL } = process.env;
  if (!R2_ENDPOINT || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET || !R2_PUBLIC_URL) {
    return { error: "Image uploads aren't set up yet. Enter an image path or URL instead." };
  }

  const extension = EXTENSIONS[contentType];
  if (!extension) return { error: "Use a PNG, JPG, WebP, GIF or SVG image." };

  const key = `uploads/${randomUUID()}.${extension}`;
  const client = new AwsClient({
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
    service: "s3",
    region: "auto",
  });

  const signed = await client.sign(
    new Request(`${R2_ENDPOINT}/${R2_BUCKET}/${key}?X-Amz-Expires=${UPLOAD_LINK_SECONDS}`, { method: "PUT" }),
    { aws: { signQuery: true } }
  );

  return { uploadUrl: signed.url, publicUrl: `${R2_PUBLIC_URL.replace(/\/$/, "")}/${key}` };
};
