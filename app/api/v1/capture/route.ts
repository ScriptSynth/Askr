import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  // Basic CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*", // In production, replace with specific domains or check Origin header against project domain
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (request.method === "OPTIONS") {
    return NextResponse.json({}, { headers });
  }

  try {
    const body = await request.json();
    const { project_id, rating, content, customer_name } = body;

    if (!project_id || !rating) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400, headers }
      );
    }

    // Insert review
    const { error: insertError } = await supabase.from("reviews").insert({
      project_id,
      rating,
      content,
      customer_name,
      status: "approved",
    });

    if (insertError) {
      if (insertError.code === "23503") { // Foreign key violation
          return NextResponse.json(
             { error: "Invalid Project ID" },
             { status: 404, headers }
          );
      }
      return NextResponse.json(
        { error: insertError.message },
        { status: 500, headers }
      );
    }

    return NextResponse.json({ success: true }, { status: 201, headers });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers }
    );
  }
}

export async function OPTIONS(request: Request) {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
    return NextResponse.json({}, { headers });
}
