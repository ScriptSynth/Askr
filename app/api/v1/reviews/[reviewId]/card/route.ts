import { createAdminClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ reviewId: string }> }
) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "public, max-age=60",
  };

  let supabase;
  try {
    supabase = createAdminClient();
  } catch (error) {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500, headers }
    );
  }

  try {
    const { reviewId } = await params;

    const { data, error } = await supabase
      .from("reviews")
      .select(
        `
        id,
        rating,
        content,
        customer_name,
        created_at,
        projects (
          name,
          slug
        )
      `
      )
      .eq("id", reviewId)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Review not found" }, { status: 404, headers });
    }

    const project = Array.isArray(data.projects) ? data.projects[0] : data.projects;

    return NextResponse.json(
      {
        id: data.id,
        rating: data.rating,
        content: data.content,
        customerName: data.customer_name || "Anonymous",
        createdAt: data.created_at,
        projectName: project?.name || "Askr Customer",
        projectSlug: project?.slug || null,
      },
      { headers }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }
  });
}
