import { NextResponse } from "next/server";
import { db } from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function POST() {
  try {
    // Check if we have a real database connection
    if (!db) {
      return NextResponse.json(
        { 
          error: "Database not configured. Please set DATABASE_URL environment variable." 
        },
        { status: 503 }
      );
    }

    // Check if data already exists to prevent duplicate seeding
    const existing = await db.select().from(advocates);
    if (existing.length > 0) {
      return NextResponse.json(
        { 
          message: "Database already seeded",
          count: existing.length,
          advocates: existing,
        },
        { status: 200 }
      );
    }

    const records = await db.insert(advocates).values(advocateData).returning();

    return NextResponse.json(
      { 
        message: "Database seeded successfully",
        advocates: records,
        count: records.length,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error seeding database:", error);
    return NextResponse.json(
      { 
        error: "Failed to seed database",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
