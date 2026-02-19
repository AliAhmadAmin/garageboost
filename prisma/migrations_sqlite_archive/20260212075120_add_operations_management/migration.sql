-- AlterTable
ALTER TABLE "Staff" ADD COLUMN "employmentType" TEXT;
ALTER TABLE "Staff" ADD COLUMN "hourlyRatePence" INTEGER;
ALTER TABLE "Staff" ADD COLUMN "jobTitle" TEXT;
ALTER TABLE "Staff" ADD COLUMN "notes" TEXT;
ALTER TABLE "Staff" ADD COLUMN "startDate" DATETIME;

-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "sku" TEXT,
    "category" TEXT,
    "brand" TEXT,
    "location" TEXT,
    "supplier" TEXT,
    "unitCostPence" INTEGER NOT NULL DEFAULT 0,
    "unitPricePence" INTEGER NOT NULL DEFAULT 0,
    "quantityOnHand" INTEGER NOT NULL DEFAULT 0,
    "reorderLevel" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "garageId" TEXT NOT NULL,
    CONSTRAINT "InventoryItem_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "InventoryTransaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitCostPence" INTEGER,
    "reference" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inventoryItemId" TEXT NOT NULL,
    "garageId" TEXT NOT NULL,
    CONSTRAINT "InventoryTransaction_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "InventoryTransaction_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "amountPence" INTEGER NOT NULL,
    "taxPence" INTEGER NOT NULL DEFAULT 0,
    "vendor" TEXT,
    "paymentMethod" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PAID',
    "incurredAt" DATETIME NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "garageId" TEXT NOT NULL,
    CONSTRAINT "Expense_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "InventoryItem_garageId_idx" ON "InventoryItem"("garageId");

-- CreateIndex
CREATE INDEX "InventoryItem_sku_idx" ON "InventoryItem"("sku");

-- CreateIndex
CREATE INDEX "InventoryItem_category_idx" ON "InventoryItem"("category");

-- CreateIndex
CREATE INDEX "InventoryItem_isActive_idx" ON "InventoryItem"("isActive");

-- CreateIndex
CREATE INDEX "InventoryTransaction_garageId_idx" ON "InventoryTransaction"("garageId");

-- CreateIndex
CREATE INDEX "InventoryTransaction_inventoryItemId_idx" ON "InventoryTransaction"("inventoryItemId");

-- CreateIndex
CREATE INDEX "InventoryTransaction_type_idx" ON "InventoryTransaction"("type");

-- CreateIndex
CREATE INDEX "Expense_garageId_idx" ON "Expense"("garageId");

-- CreateIndex
CREATE INDEX "Expense_category_idx" ON "Expense"("category");

-- CreateIndex
CREATE INDEX "Expense_incurredAt_idx" ON "Expense"("incurredAt");

-- CreateIndex
CREATE INDEX "Expense_status_idx" ON "Expense"("status");
