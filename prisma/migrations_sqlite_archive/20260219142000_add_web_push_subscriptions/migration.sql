-- CreateTable
CREATE TABLE "WebPushSubscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "endpoint" TEXT NOT NULL,
    "p256dh" TEXT NOT NULL,
    "auth" TEXT NOT NULL,
    "userAgent" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "garageId" TEXT NOT NULL,
    CONSTRAINT "WebPushSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "WebPushSubscription_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "WebPushSubscription_endpoint_key" ON "WebPushSubscription"("endpoint");

-- CreateIndex
CREATE INDEX "WebPushSubscription_userId_idx" ON "WebPushSubscription"("userId");

-- CreateIndex
CREATE INDEX "WebPushSubscription_garageId_idx" ON "WebPushSubscription"("garageId");
