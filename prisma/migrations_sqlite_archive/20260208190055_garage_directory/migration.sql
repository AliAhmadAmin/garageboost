-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'GARAGE_OWNER',
    "passwordHash" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Garage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "slug" TEXT,
    "plan" TEXT NOT NULL DEFAULT 'professional',
    "status" TEXT NOT NULL DEFAULT 'TRIAL',
    "trialEndsAt" DATETIME,
    "revenuePence" INTEGER NOT NULL DEFAULT 0,
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "shortDescription" TEXT,
    "services" TEXT,
    "specialties" TEXT,
    "certifications" TEXT,
    "amenities" TEXT,
    "city" TEXT,
    "county" TEXT,
    "openingHours" TEXT,
    "logoUrl" TEXT,
    "postcode" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "ownerId" TEXT,
    CONSTRAINT "Garage_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GarageImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "garageId" TEXT NOT NULL,
    CONSTRAINT "GarageImage_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GarageInquiry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "garageId" TEXT NOT NULL,
    CONSTRAINT "GarageInquiry_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GarageSignup" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "passwordHash" TEXT,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "phoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "emailToken" TEXT,
    "emailTokenExpires" DATETIME,
    "phoneOtp" TEXT,
    "phoneOtpExpires" DATETIME,
    "garageName" TEXT,
    "postcode" TEXT,
    "address" TEXT,
    "businessType" TEXT,
    "selectedPlan" TEXT,
    "proofPhotoUrl" TEXT,
    "proofCardUrl" TEXT,
    "companyNumber" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Vehicle" (
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "garageId" TEXT NOT NULL,
    CONSTRAINT "Vehicle_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Advisory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "estPricePence" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vehicleId" TEXT NOT NULL,
    CONSTRAINT "Advisory_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reminder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "channel" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "scheduledFor" DATETIME,
    "sentAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vehicleId" TEXT NOT NULL,
    CONSTRAINT "Reminder_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ApiConfig" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "jobNumber" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'BOOKED',
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
    CONSTRAINT "Job_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "JobItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "quantity" REAL NOT NULL DEFAULT 1,
    "unitPricePence" INTEGER NOT NULL,
    "totalPence" INTEGER NOT NULL,
    "supplierCost" INTEGER,
    "partNumber" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jobId" TEXT NOT NULL,
    CONSTRAINT "JobItem_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "invoiceNumber" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'UNPAID',
    "issuedDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" DATETIME NOT NULL,
    "paidDate" DATETIME,
    "subtotalPence" INTEGER NOT NULL,
    "vatPence" INTEGER NOT NULL,
    "totalPence" INTEGER NOT NULL,
    "paidPence" INTEGER NOT NULL DEFAULT 0,
    "balancePence" INTEGER NOT NULL,
    "paymentMethod" TEXT,
    "stripePaymentId" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "jobId" TEXT NOT NULL,
    CONSTRAINT "Invoice_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quoteNumber" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "issuedDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiryDate" DATETIME NOT NULL,
    "acceptedDate" DATETIME,
    "declinedDate" DATETIME,
    "declineReason" TEXT,
    "subtotalPence" INTEGER NOT NULL,
    "vatPence" INTEGER NOT NULL,
    "totalPence" INTEGER NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhone" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "garageId" TEXT NOT NULL,
    "jobId" TEXT,
    "invoiceId" TEXT,
    CONSTRAINT "Quote_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Quote_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Quote_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Quote_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "QuoteItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "quantity" REAL NOT NULL DEFAULT 1,
    "unitPricePence" INTEGER NOT NULL,
    "totalPence" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quoteId" TEXT NOT NULL,
    CONSTRAINT "QuoteItem_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "QuoteActivity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "action" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "details" TEXT,
    "quoteId" TEXT NOT NULL,
    CONSTRAINT "QuoteActivity_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amountPence" INTEGER NOT NULL,
    "method" TEXT NOT NULL,
    "reference" TEXT,
    "stripePaymentId" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "invoiceId" TEXT NOT NULL,
    CONSTRAINT "Payment_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Garage_slug_key" ON "Garage"("slug");

-- CreateIndex
CREATE INDEX "GarageImage_garageId_idx" ON "GarageImage"("garageId");

-- CreateIndex
CREATE INDEX "GarageInquiry_garageId_idx" ON "GarageInquiry"("garageId");

-- CreateIndex
CREATE INDEX "GarageInquiry_status_idx" ON "GarageInquiry"("status");

-- CreateIndex
CREATE INDEX "GarageSignup_email_idx" ON "GarageSignup"("email");

-- CreateIndex
CREATE INDEX "GarageSignup_phone_idx" ON "GarageSignup"("phone");

-- CreateIndex
CREATE INDEX "GarageSignup_status_idx" ON "GarageSignup"("status");

-- CreateIndex
CREATE INDEX "Vehicle_garageId_idx" ON "Vehicle"("garageId");

-- CreateIndex
CREATE INDEX "Advisory_vehicleId_idx" ON "Advisory"("vehicleId");

-- CreateIndex
CREATE INDEX "Reminder_vehicleId_idx" ON "Reminder"("vehicleId");

-- CreateIndex
CREATE UNIQUE INDEX "ApiConfig_key_key" ON "ApiConfig"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Job_jobNumber_key" ON "Job"("jobNumber");

-- CreateIndex
CREATE INDEX "Job_garageId_idx" ON "Job"("garageId");

-- CreateIndex
CREATE INDEX "Job_vehicleId_idx" ON "Job"("vehicleId");

-- CreateIndex
CREATE INDEX "Job_status_idx" ON "Job"("status");

-- CreateIndex
CREATE INDEX "JobItem_jobId_idx" ON "JobItem"("jobId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_invoiceNumber_key" ON "Invoice"("invoiceNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_jobId_key" ON "Invoice"("jobId");

-- CreateIndex
CREATE INDEX "Invoice_status_idx" ON "Invoice"("status");

-- CreateIndex
CREATE INDEX "Invoice_dueDate_idx" ON "Invoice"("dueDate");

-- CreateIndex
CREATE UNIQUE INDEX "Quote_quoteNumber_key" ON "Quote"("quoteNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Quote_invoiceId_key" ON "Quote"("invoiceId");

-- CreateIndex
CREATE INDEX "Quote_status_idx" ON "Quote"("status");

-- CreateIndex
CREATE INDEX "Quote_garageId_idx" ON "Quote"("garageId");

-- CreateIndex
CREATE INDEX "Quote_vehicleId_idx" ON "Quote"("vehicleId");

-- CreateIndex
CREATE INDEX "Quote_expiryDate_idx" ON "Quote"("expiryDate");

-- CreateIndex
CREATE INDEX "QuoteItem_quoteId_idx" ON "QuoteItem"("quoteId");

-- CreateIndex
CREATE INDEX "QuoteActivity_quoteId_idx" ON "QuoteActivity"("quoteId");

-- CreateIndex
CREATE INDEX "Payment_invoiceId_idx" ON "Payment"("invoiceId");
