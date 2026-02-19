-- AlterTable
ALTER TABLE "ReminderConfig" ADD COLUMN "emailNotifications" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "ReminderConfig" ADD COLUMN "weeklyReports" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "ReminderConfig" ADD COLUMN "reminderSent" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "ReminderConfig" ADD COLUMN "jobUpdates" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "ReminderConfig" ADD COLUMN "bookingRequests" BOOLEAN NOT NULL DEFAULT true;
