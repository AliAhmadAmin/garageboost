/*
  Warnings:

  - A unique constraint covering the columns `[bookingId]` on the table `Job` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN "source" TEXT DEFAULT 'GARAGE';

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN "source" TEXT DEFAULT 'GARAGE';

-- AlterTable
ALTER TABLE "Job" ADD COLUMN "bookingId" TEXT;
ALTER TABLE "Job" ADD COLUMN "source" TEXT DEFAULT 'GARAGE';

-- CreateIndex
CREATE UNIQUE INDEX "Job_bookingId_key" ON "Job"("bookingId");
