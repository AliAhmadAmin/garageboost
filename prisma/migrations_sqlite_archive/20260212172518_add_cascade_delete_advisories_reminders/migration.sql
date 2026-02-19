-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Advisory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "estPricePence" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vehicleId" TEXT NOT NULL,
    CONSTRAINT "Advisory_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Advisory" ("category", "createdAt", "estPricePence", "id", "text", "vehicleId") SELECT "category", "createdAt", "estPricePence", "id", "text", "vehicleId" FROM "Advisory";
DROP TABLE "Advisory";
ALTER TABLE "new_Advisory" RENAME TO "Advisory";
CREATE INDEX "Advisory_vehicleId_idx" ON "Advisory"("vehicleId");
CREATE TABLE "new_Reminder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "channel" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "scheduledFor" DATETIME,
    "sentAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vehicleId" TEXT NOT NULL,
    CONSTRAINT "Reminder_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Reminder" ("channel", "createdAt", "id", "scheduledFor", "sentAt", "status", "vehicleId") SELECT "channel", "createdAt", "id", "scheduledFor", "sentAt", "status", "vehicleId" FROM "Reminder";
DROP TABLE "Reminder";
ALTER TABLE "new_Reminder" RENAME TO "Reminder";
CREATE INDEX "Reminder_vehicleId_idx" ON "Reminder"("vehicleId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
