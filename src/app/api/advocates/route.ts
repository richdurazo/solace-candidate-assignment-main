import { NextResponse } from "next/server";
import { db } from "../../../db";
import { advocates } from "../../../db/schema";
import { AdvocatesResponse } from "../../../types/api";

export const revalidate = 60;

export async function GET() {
  const start = Date.now();

  try {
    if (!db) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      );
    }
    const data = await db.select().from(advocates);

    const duration = Date.now() - start;
    console.log(`Advocates API: ${data.length} rows in ${duration}ms`);

    const body: AdvocatesResponse = {
      success: true,
      data,
      count: data.length,
      message: `Successfully fetched ${data.length} advocates`,
    };

    return new NextResponse(JSON.stringify(body), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60",
        "X-Response-Time": `${duration}ms`,
      },
    });
  } catch (err) {
    const duration = Date.now() - start;
    console.error(`Advocates API Error (${duration}ms):`, err);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch advocates",
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
