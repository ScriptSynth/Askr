import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { projectId } = await params;
  const supabase = await createClient();

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "public, max-age=60", // Cache for 1 minute
  };

  try {
    const { data: project, error } = await supabase
      .from("projects")
      .select(`
        widget_width,
        widget_height,
        widget_position,
        widget_trigger_delay,
        widget_trigger_scroll,
        widget_open_animation,
        widget_close_animation,
        widget_show_once_session,
        widget_device_target
      `)
      .or(`id.eq.${projectId},slug.eq.${projectId}`)
      .single();

    if (error || !project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404, headers }
      );
    }

    const triggerDelay = project.widget_trigger_delay ?? 5
    const triggerScroll = project.widget_trigger_scroll ?? 50

    return NextResponse.json({
      position: project.widget_position ?? "bottom-right",
      width: project.widget_width ?? 380,
      height: project.widget_height ?? 420,
      delay: triggerDelay * 1000, // Convert to ms
      scroll: triggerScroll / 100, // Convert to 0-1
      openAnimation: project.widget_open_animation ?? "fade",
      closeAnimation: project.widget_close_animation ?? "fade",
      showOnceSession: project.widget_show_once_session === true,
      deviceTarget: project.widget_device_target ?? "all"
    }, { headers });
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
