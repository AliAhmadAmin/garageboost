-- CreateTable
CREATE TABLE "EmailQueueJob" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "garageId" TEXT NOT NULL,
    "customerId" TEXT,
    "campaignId" TEXT,
    "recipientEmail" TEXT NOT NULL,
    "recipientName" TEXT,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "maxAttempts" INTEGER NOT NULL DEFAULT 5,
    "lastError" TEXT,
    "scheduledFor" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processingAt" DATETIME,
    "sentAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EmailQueueJob_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "EmailQueueJob_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "EmailQueueJob_status_scheduledFor_idx" ON "EmailQueueJob"("status", "scheduledFor");

-- CreateIndex
CREATE INDEX "EmailQueueJob_garageId_idx" ON "EmailQueueJob"("garageId");

-- CreateIndex
CREATE INDEX "EmailQueueJob_campaignId_idx" ON "EmailQueueJob"("campaignId");

-- CreateIndex
CREATE INDEX "EmailQueueJob_recipientEmail_idx" ON "EmailQueueJob"("recipientEmail");
