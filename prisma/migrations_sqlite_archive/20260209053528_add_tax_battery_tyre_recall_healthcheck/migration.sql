-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rating" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "response" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "garageId" TEXT NOT NULL,
    CONSTRAINT "Review_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "garageId" TEXT NOT NULL,
    CONSTRAINT "Customer_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Recall" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "vrm" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "buildDateFrom" TEXT,
    "buildDateTo" TEXT,
    "recallTitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "risk" TEXT NOT NULL,
    "remedy" TEXT NOT NULL,
    "issuedDate" DATETIME NOT NULL,
    "notified" BOOLEAN NOT NULL DEFAULT false,
    "notifiedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vehicleId" TEXT NOT NULL,
    CONSTRAINT "Recall_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HealthCheck" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "checkNumber" TEXT NOT NULL,
    "checkedBy" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vehicleId" TEXT NOT NULL,
    "garageId" TEXT NOT NULL,
    "pdfUrl" TEXT,
    "emailedAt" DATETIME,
    "customerViewed" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "HealthCheck_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "HealthCheck_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HealthCheckItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "notes" TEXT,
    "estimatedCost" INTEGER,
    "urgency" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "healthCheckId" TEXT NOT NULL,
    CONSTRAINT "HealthCheckItem_healthCheckId_fkey" FOREIGN KEY ("healthCheckId") REFERENCES "HealthCheck" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "durationMinutes" INTEGER NOT NULL DEFAULT 60,
    "pricePence" INTEGER NOT NULL,
    "depositRequired" BOOLEAN NOT NULL DEFAULT false,
    "depositPence" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "garageId" TEXT NOT NULL,
    CONSTRAINT "Service_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Booking" (
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
    CONSTRAINT "Booking_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "vrm" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "motExpiry" DATETIME NOT NULL,
    "ownerName" TEXT NOT NULL,
    "ownerPhone" TEXT,
    "ownerEmail" TEXT,
    "lastService" DATETIME,
    "mileage" INTEGER,
    "taxExpiry" DATETIME,
    "taxStatus" TEXT,
    "batteryInstallDate" DATETIME,
    "batteryBrand" TEXT,
    "batteryVoltage" REAL,
    "batteryCCA" INTEGER,
    "batteryHealth" INTEGER,
    "batteryLastChecked" DATETIME,
    "tyreFrontLeftDepth" REAL,
    "tyreFrontRightDepth" REAL,
    "tyreRearLeftDepth" REAL,
    "tyreRearRightDepth" REAL,
    "tyreSize" TEXT,
    "tyreBrand" TEXT,
    "tyreLastChecked" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "garageId" TEXT NOT NULL,
    "customerId" TEXT,
    CONSTRAINT "Vehicle_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vehicle_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Vehicle" ("createdAt", "garageId", "id", "lastService", "make", "mileage", "model", "motExpiry", "ownerEmail", "ownerName", "ownerPhone", "updatedAt", "vrm") SELECT "createdAt", "garageId", "id", "lastService", "make", "mileage", "model", "motExpiry", "ownerEmail", "ownerName", "ownerPhone", "updatedAt", "vrm" FROM "Vehicle";
DROP TABLE "Vehicle";
ALTER TABLE "new_Vehicle" RENAME TO "Vehicle";
CREATE INDEX "Vehicle_garageId_idx" ON "Vehicle"("garageId");
CREATE INDEX "Vehicle_customerId_idx" ON "Vehicle"("customerId");
CREATE INDEX "Vehicle_taxExpiry_idx" ON "Vehicle"("taxExpiry");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Review_customerEmail_key" ON "Review"("customerEmail");

-- CreateIndex
CREATE INDEX "Review_garageId_idx" ON "Review"("garageId");

-- CreateIndex
CREATE INDEX "Review_status_idx" ON "Review"("status");

-- CreateIndex
CREATE INDEX "Review_rating_idx" ON "Review"("rating");

-- CreateIndex
CREATE INDEX "Customer_garageId_idx" ON "Customer"("garageId");

-- CreateIndex
CREATE INDEX "Customer_email_idx" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_garageId_email_key" ON "Customer"("garageId", "email");

-- CreateIndex
CREATE INDEX "Recall_vehicleId_idx" ON "Recall"("vehicleId");

-- CreateIndex
CREATE INDEX "Recall_notified_idx" ON "Recall"("notified");

-- CreateIndex
CREATE UNIQUE INDEX "HealthCheck_checkNumber_key" ON "HealthCheck"("checkNumber");

-- CreateIndex
CREATE INDEX "HealthCheck_vehicleId_idx" ON "HealthCheck"("vehicleId");

-- CreateIndex
CREATE INDEX "HealthCheck_garageId_idx" ON "HealthCheck"("garageId");

-- CreateIndex
CREATE INDEX "HealthCheckItem_healthCheckId_idx" ON "HealthCheckItem"("healthCheckId");

-- CreateIndex
CREATE INDEX "Service_garageId_idx" ON "Service"("garageId");

-- CreateIndex
CREATE INDEX "Service_category_idx" ON "Service"("category");

-- CreateIndex
CREATE INDEX "Service_isActive_idx" ON "Service"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_bookingNumber_key" ON "Booking"("bookingNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_jobId_key" ON "Booking"("jobId");

-- CreateIndex
CREATE INDEX "Booking_garageId_idx" ON "Booking"("garageId");

-- CreateIndex
CREATE INDEX "Booking_serviceId_idx" ON "Booking"("serviceId");

-- CreateIndex
CREATE INDEX "Booking_status_idx" ON "Booking"("status");

-- CreateIndex
CREATE INDEX "Booking_bookingDate_idx" ON "Booking"("bookingDate");

-- CreateIndex
CREATE INDEX "Booking_customerEmail_idx" ON "Booking"("customerEmail");
