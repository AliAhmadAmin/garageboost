-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "garageId" TEXT NOT NULL,
    CONSTRAINT "Staff_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookingNumber" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "vehicleVrm" TEXT,
    "vehicleMake" TEXT,
    "vehicleModel" TEXT,
    "bookingDate" DATETIME NOT NULL,
    "bookingTime" TEXT NOT NULL,
    "notes" TEXT,
    "depositPaid" BOOLEAN NOT NULL DEFAULT false,
    "depositPence" INTEGER NOT NULL DEFAULT 0,
    "stripePaymentIntentId" TEXT,
    "stripePaymentStatus" TEXT,
    "confirmedAt" DATETIME,
    "cancelledAt" DATETIME,
    "cancellationReason" TEXT,
    "completedAt" DATETIME,
    "jobId" TEXT,
    "convertedToJob" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "garageId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "staffId" TEXT,
    CONSTRAINT "Booking_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Booking_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("bookingDate", "bookingNumber", "bookingTime", "cancellationReason", "cancelledAt", "completedAt", "confirmedAt", "convertedToJob", "createdAt", "customerEmail", "customerName", "customerPhone", "depositPaid", "depositPence", "garageId", "id", "jobId", "notes", "serviceId", "status", "stripePaymentIntentId", "stripePaymentStatus", "updatedAt", "vehicleMake", "vehicleModel", "vehicleVrm") SELECT "bookingDate", "bookingNumber", "bookingTime", "cancellationReason", "cancelledAt", "completedAt", "confirmedAt", "convertedToJob", "createdAt", "customerEmail", "customerName", "customerPhone", "depositPaid", "depositPence", "garageId", "id", "jobId", "notes", "serviceId", "status", "stripePaymentIntentId", "stripePaymentStatus", "updatedAt", "vehicleMake", "vehicleModel", "vehicleVrm" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
CREATE UNIQUE INDEX "Booking_bookingNumber_key" ON "Booking"("bookingNumber");
CREATE UNIQUE INDEX "Booking_jobId_key" ON "Booking"("jobId");
CREATE INDEX "Booking_garageId_idx" ON "Booking"("garageId");
CREATE INDEX "Booking_serviceId_idx" ON "Booking"("serviceId");
CREATE INDEX "Booking_status_idx" ON "Booking"("status");
CREATE INDEX "Booking_bookingDate_idx" ON "Booking"("bookingDate");
CREATE INDEX "Booking_customerEmail_idx" ON "Booking"("customerEmail");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
