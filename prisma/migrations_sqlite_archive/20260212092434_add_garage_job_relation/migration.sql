-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Job" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "jobNumber" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'TODO',
    "description" TEXT,
    "bookedDate" DATETIME,
    "startedAt" DATETIME,
    "completedAt" DATETIME,
    "estimatedHours" REAL,
    "actualHours" REAL,
    "laborRate" INTEGER NOT NULL DEFAULT 5000,
    "laborTotal" INTEGER NOT NULL DEFAULT 0,
    "partsTotal" INTEGER NOT NULL DEFAULT 0,
    "vatRate" REAL NOT NULL DEFAULT 20.0,
    "discountPence" INTEGER NOT NULL DEFAULT 0,
    "totalPence" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "garageId" TEXT NOT NULL,
    "assignedToId" TEXT,
    CONSTRAINT "Job_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Job_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Job_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "Staff" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Job" ("actualHours", "assignedToId", "bookedDate", "completedAt", "createdAt", "description", "discountPence", "estimatedHours", "garageId", "id", "jobNumber", "laborRate", "laborTotal", "notes", "partsTotal", "startedAt", "status", "totalPence", "type", "updatedAt", "vatRate", "vehicleId") SELECT "actualHours", "assignedToId", "bookedDate", "completedAt", "createdAt", "description", "discountPence", "estimatedHours", "garageId", "id", "jobNumber", "laborRate", "laborTotal", "notes", "partsTotal", "startedAt", "status", "totalPence", "type", "updatedAt", "vatRate", "vehicleId" FROM "Job";
DROP TABLE "Job";
ALTER TABLE "new_Job" RENAME TO "Job";
CREATE UNIQUE INDEX "Job_jobNumber_key" ON "Job"("jobNumber");
CREATE INDEX "Job_garageId_idx" ON "Job"("garageId");
CREATE INDEX "Job_vehicleId_idx" ON "Job"("vehicleId");
CREATE INDEX "Job_status_idx" ON "Job"("status");
CREATE INDEX "Job_assignedToId_idx" ON "Job"("assignedToId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
