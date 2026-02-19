-- Add VAT toggle at garage level
ALTER TABLE "Garage" ADD COLUMN "vatEnabled" BOOLEAN NOT NULL DEFAULT true;
