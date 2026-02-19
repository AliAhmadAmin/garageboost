-- CreateTable
CREATE TABLE "ReminderConfig" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "garageId" TEXT NOT NULL,
    "motDaysCsv" TEXT NOT NULL DEFAULT '30,14,7',
    "taxDaysCsv" TEXT NOT NULL DEFAULT '30,14,7',
    "serviceMonthsCsv" TEXT NOT NULL DEFAULT '',
    "motEnabled" BOOLEAN NOT NULL DEFAULT true,
    "taxEnabled" BOOLEAN NOT NULL DEFAULT true,
    "serviceEnabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ReminderConfig_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ReminderConfig_garageId_key" ON "ReminderConfig"("garageId");

-- CreateIndex
CREATE INDEX "ReminderConfig_garageId_idx" ON "ReminderConfig"("garageId");
