-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "subject" TEXT,
    "channel" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "targetAudience" TEXT NOT NULL DEFAULT 'all',
    "scheduledFor" DATETIME,
    "sentCount" INTEGER NOT NULL DEFAULT 0,
    "failedCount" INTEGER NOT NULL DEFAULT 0,
    "skippedCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "garageId" TEXT NOT NULL,
    CONSTRAINT "Campaign_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CampaignRecipient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "sentAt" DATETIME,
    "errorMessage" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "campaignId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    CONSTRAINT "CampaignRecipient_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CampaignRecipient_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "notes" TEXT,
    "emailOptOut" BOOLEAN NOT NULL DEFAULT false,
    "smsOptOut" BOOLEAN NOT NULL DEFAULT false,
    "unsubscribedAt" DATETIME,
    "unsubscribeToken" TEXT,
    "lastCampaignSentAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "garageId" TEXT NOT NULL,
    CONSTRAINT "Customer_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Customer" ("createdAt", "email", "garageId", "id", "name", "notes", "phone", "updatedAt") SELECT "createdAt", "email", "garageId", "id", "name", "notes", "phone", "updatedAt" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_unsubscribeToken_key" ON "Customer"("unsubscribeToken");
CREATE INDEX "Customer_garageId_idx" ON "Customer"("garageId");
CREATE INDEX "Customer_email_idx" ON "Customer"("email");
CREATE INDEX "Customer_emailOptOut_idx" ON "Customer"("emailOptOut");
CREATE INDEX "Customer_smsOptOut_idx" ON "Customer"("smsOptOut");
CREATE UNIQUE INDEX "Customer_garageId_email_key" ON "Customer"("garageId", "email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "Campaign_garageId_idx" ON "Campaign"("garageId");

-- CreateIndex
CREATE INDEX "Campaign_status_idx" ON "Campaign"("status");

-- CreateIndex
CREATE INDEX "Campaign_scheduledFor_idx" ON "Campaign"("scheduledFor");

-- CreateIndex
CREATE INDEX "CampaignRecipient_campaignId_idx" ON "CampaignRecipient"("campaignId");

-- CreateIndex
CREATE INDEX "CampaignRecipient_customerId_idx" ON "CampaignRecipient"("customerId");

-- CreateIndex
CREATE INDEX "CampaignRecipient_status_idx" ON "CampaignRecipient"("status");
