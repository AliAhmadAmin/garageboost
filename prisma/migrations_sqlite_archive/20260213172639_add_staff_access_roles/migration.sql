-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Staff" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "accessRole" TEXT NOT NULL DEFAULT 'TECHNICIAN',
    "jobTitle" TEXT,
    "employmentType" TEXT,
    "startDate" DATETIME,
    "hourlyRatePence" INTEGER,
    "phone" TEXT,
    "email" TEXT,
    "avatarUrl" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT,
    "garageId" TEXT NOT NULL,
    CONSTRAINT "Staff_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Staff_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Staff" ("active", "avatarUrl", "createdAt", "email", "employmentType", "garageId", "hourlyRatePence", "id", "jobTitle", "name", "notes", "phone", "role", "startDate", "updatedAt") SELECT "active", "avatarUrl", "createdAt", "email", "employmentType", "garageId", "hourlyRatePence", "id", "jobTitle", "name", "notes", "phone", "role", "startDate", "updatedAt" FROM "Staff";
DROP TABLE "Staff";
ALTER TABLE "new_Staff" RENAME TO "Staff";
CREATE UNIQUE INDEX "Staff_userId_key" ON "Staff"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
