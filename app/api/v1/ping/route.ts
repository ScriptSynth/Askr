import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  try {
    const body = await request.json();
    const { project_id } = body;

    if (!project_id) {
      return NextResponse.json(
        { error: "Missing project_id" },
        { status: 400, headers }
      );
    }

    // Update project widget status
    const { error } = await supabase
      .from("projects")
      .update({
        widget_connected: true,
        widget_last_ping: new Date().toISOString(),
      })
      .eq("id", project_id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500, headers }
      );
    }

    return NextResponse.json({ success: true }, { status: 200, headers });
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
