import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { getApiKey } from "@/app/api/admin/config/route";

const db = prisma as any;

function nextRetryDate(attempt: number) {
  const delaySeconds = Math.min(60 * Math.pow(2, Math.max(0, attempt - 1)), 60 * 30);
  return new Date(Date.now() + delaySeconds * 1000);
}

export async function processEmailQueue(limit = 25) {
  const now = new Date();
  const jobs: Array<any> = await db.emailQueueJob.findMany({
    where: {
      status: { in: ["PENDING", "RETRY"] },
      scheduledFor: { lte: now },
    },
    orderBy: [{ scheduledFor: "asc" }, { createdAt: "asc" }],
    take: Math.max(1, Math.min(100, limit)),
  });

  if (jobs.length === 0) {
    return { picked: 0, sent: 0, failed: 0, retried: 0 };
  }

  let apiKey = await getApiKey("RESEND_API_KEY");
  let fromEmail = await getApiKey("RESEND_FROM_EMAIL");
  const defaultFromName =
    (await getApiKey("RESEND_FROM_NAME")) || process.env.NEXT_PUBLIC_APP_NAME || "Garage Boost";

  if (!apiKey) apiKey = process.env.RESEND_API_KEY ?? null;
  if (!fromEmail) fromEmail = process.env.RESEND_FROM_EMAIL ?? null;

  if (!apiKey || !fromEmail) {
    return {
      picked: jobs.length,
      sent: 0,
      failed: jobs.length,
      retried: 0,
      configError: "RESEND_API_KEY/RESEND_FROM_EMAIL missing",
    };
  }

  const resend = new Resend(apiKey);
  const garageIds = [...new Set(jobs.map((job: any) => String(job.garageId)))];
  const garages: Array<{ id: string; name: string | null; email: string | null; phone: string | null }> = await db.garage.findMany({
    where: { id: { in: garageIds } },
    select: { id: true, name: true, email: true, phone: true },
  });
  const garageMap = new Map<string, { id: string; name: string | null; email: string | null; phone: string | null }>(
    garages.map((garage) => [garage.id, garage])
  );

  let sent = 0;
  let failed = 0;
  let retried = 0;
  const impactedCampaignIds = new Set<string>();

  for (const job of jobs) {
    const claim = await db.emailQueueJob.updateMany({
      where: {
        id: job.id,
        status: { in: ["PENDING", "RETRY"] },
      },
      data: {
        status: "PROCESSING",
        processingAt: new Date(),
        attempts: { increment: 1 },
      },
    });

    if (claim.count === 0) continue;

    const currentAttempt = job.attempts + 1;

    try {
      const garage = garageMap.get(job.garageId);
      const fromName = garage?.name || defaultFromName;

      await resend.emails.send({
        from: `${fromName} <${fromEmail}>`,
        replyTo: garage?.email || undefined,
        to: job.recipientEmail,
        subject: job.subject,
        html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <p>${job.message.replace(/\n/g, "<br>")}</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #666; font-size: 12px;">
            ${garage?.name || "Garage Boost"}<br>
            ${garage?.email ? `Email: ${garage.email}<br>` : ""}
            ${garage?.phone ? `Phone: ${garage.phone}` : ""}
          </p>
        </div>`,
      });

      await db.emailQueueJob.update({
        where: { id: job.id },
        data: {
          status: "SENT",
          sentAt: new Date(),
          lastError: null,
        },
      });

      if (job.campaignId && job.customerId) {
        impactedCampaignIds.add(job.campaignId);
        const existingRecipient = await db.campaignRecipient.findFirst({
          where: {
            campaignId: job.campaignId,
            customerId: job.customerId,
          },
          select: { id: true },
        });

        if (existingRecipient) {
          await db.campaignRecipient.update({
            where: { id: existingRecipient.id },
            data: {
              status: "SENT",
              sentAt: new Date(),
              errorMessage: null,
            },
          });
        } else {
          await db.campaignRecipient.create({
            data: {
              campaignId: job.campaignId,
              customerId: job.customerId,
              status: "SENT",
              sentAt: new Date(),
            },
          });
        }

        await db.customer.update({
          where: { id: job.customerId },
          data: { lastCampaignSentAt: new Date() },
        });
      }

      sent += 1;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const shouldFail = currentAttempt >= job.maxAttempts;

      await db.emailQueueJob.update({
        where: { id: job.id },
        data: {
          status: shouldFail ? "FAILED" : "RETRY",
          lastError: message,
          scheduledFor: shouldFail ? job.scheduledFor : nextRetryDate(currentAttempt),
        },
      });

      if (job.campaignId && job.customerId && shouldFail) {
        impactedCampaignIds.add(job.campaignId);
        const existingRecipient = await db.campaignRecipient.findFirst({
          where: {
            campaignId: job.campaignId,
            customerId: job.customerId,
          },
          select: { id: true },
        });

        if (existingRecipient) {
          await db.campaignRecipient.update({
            where: { id: existingRecipient.id },
            data: {
              status: "FAILED",
              errorMessage: message,
            },
          });
        } else {
          await db.campaignRecipient.create({
            data: {
              campaignId: job.campaignId,
              customerId: job.customerId,
              status: "FAILED",
              errorMessage: message,
            },
          });
        }
      }

      if (shouldFail) failed += 1;
      else retried += 1;
    }
  }

  for (const campaignId of impactedCampaignIds) {
    const [sentCount, failedCount, skippedCount, activeQueueCount] = await Promise.all([
      db.campaignRecipient.count({ where: { campaignId, status: "SENT" } }),
      db.campaignRecipient.count({ where: { campaignId, status: "FAILED" } }),
      db.campaignRecipient.count({ where: { campaignId, status: "SKIPPED" } }),
      db.emailQueueJob.count({
        where: {
          campaignId,
          status: { in: ["PENDING", "PROCESSING", "RETRY"] },
        },
      }),
    ]);

    await db.campaign.update({
      where: { id: campaignId },
      data: {
        sentCount,
        failedCount,
        skippedCount,
        status: activeQueueCount > 0 ? "SENDING" : "COMPLETED",
      },
    });
  }

  return { picked: jobs.length, sent, failed, retried };
}
