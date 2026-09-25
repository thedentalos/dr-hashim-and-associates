import { NextResponse } from "next/server";
import { getGoogleReviews } from "../../google-reviews";

const noStoreHeaders = { "Cache-Control": "no-store" };

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getGoogleReviews();

  return NextResponse.json(data, {
    status: data.error ? 502 : 200,
    headers: noStoreHeaders,
  });
}
