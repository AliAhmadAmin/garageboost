import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireGarageAdminAccess } from "@/lib/auth-guards";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; jobId: string }> }
) {
  try {
    const { id: garageId, jobId } = await params;
    const body = await request.json();
    const { status } = body;

    const guard = await requireGarageAdminAccess(request, garageId);
    if ("response" in guard) return guard.response;

    // Validate status transition
    const validStatuses = ["TODO", "DOING", "DONE"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    // Get the job
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    if (job.garageId !== garageId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Update timestamps based on status transition
    const updateData: any = { status };

    if (status === "DOING" && !job.startedAt) {
      updateData.startedAt = new Date();
    }

    if (status === "DONE" && !job.completedAt) {
      updateData.completedAt = new Date();
      // Calculate actual hours if startedAt exists
      if (job.startedAt) {
        const actualHours =
          (new Date().getTime() - job.startedAt.getTime()) / (1000 * 60 * 60);
        updateData.actualHours = Math.round(actualHours * 100) / 100;
      }
    }

    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: updateData,
    });

    return NextResponse.json({ job: updatedJob }, { status: 200 });
  } catch (error) {
    console.error("Error updating job status:", error);
    return NextResponse.json(
      { error: "Failed to update job status" },
      { status: 500 }
    );
  }
}
