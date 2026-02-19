-- Persist VAT rate used for each quote
ALTER TABLE "Quote" ADD COLUMN "vatRate" REAL NOT NULL DEFAULT 20.0;
