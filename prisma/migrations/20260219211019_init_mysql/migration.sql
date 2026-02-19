-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'GARAGE_OWNER',
    `passwordHash` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Garage` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `ownerName` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NULL,
    `plan` VARCHAR(191) NOT NULL DEFAULT 'professional',
    `status` VARCHAR(191) NOT NULL DEFAULT 'TRIAL',
    `trialEndsAt` DATETIME(3) NULL,
    `revenuePence` INTEGER NOT NULL DEFAULT 0,
    `stripeCustomerId` VARCHAR(191) NULL,
    `stripeSubscriptionId` VARCHAR(191) NULL,
    `isPublic` BOOLEAN NOT NULL DEFAULT true,
    `shortDescription` VARCHAR(191) NULL,
    `services` VARCHAR(191) NULL,
    `specialties` VARCHAR(191) NULL,
    `certifications` VARCHAR(191) NULL,
    `amenities` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `county` VARCHAR(191) NULL,
    `openingHours` VARCHAR(191) NULL,
    `logoUrl` VARCHAR(191) NULL,
    `postcode` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `website` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `vatEnabled` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `ownerId` VARCHAR(191) NULL,

    UNIQUE INDEX `Garage_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GarageImage` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `alt` VARCHAR(191) NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `garageId` VARCHAR(191) NOT NULL,

    INDEX `GarageImage_garageId_idx`(`garageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Staff` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `accessRole` VARCHAR(191) NOT NULL DEFAULT 'TECHNICIAN',
    `jobTitle` VARCHAR(191) NULL,
    `employmentType` VARCHAR(191) NULL,
    `startDate` DATETIME(3) NULL,
    `hourlyRatePence` INTEGER NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `avatarUrl` VARCHAR(191) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `notes` VARCHAR(191) NULL,
    `permissions` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `garageId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Staff_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InventoryItem` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `sku` VARCHAR(191) NULL,
    `category` VARCHAR(191) NULL,
    `brand` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `supplier` VARCHAR(191) NULL,
    `unitCostPence` INTEGER NOT NULL DEFAULT 0,
    `unitPricePence` INTEGER NOT NULL DEFAULT 0,
    `quantityOnHand` INTEGER NOT NULL DEFAULT 0,
    `reorderLevel` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `garageId` VARCHAR(191) NOT NULL,

    INDEX `InventoryItem_garageId_idx`(`garageId`),
    INDEX `InventoryItem_sku_idx`(`sku`),
    INDEX `InventoryItem_category_idx`(`category`),
    INDEX `InventoryItem_isActive_idx`(`isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InventoryTransaction` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `unitCostPence` INTEGER NULL,
    `reference` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `inventoryItemId` VARCHAR(191) NOT NULL,
    `garageId` VARCHAR(191) NOT NULL,

    INDEX `InventoryTransaction_garageId_idx`(`garageId`),
    INDEX `InventoryTransaction_inventoryItemId_idx`(`inventoryItemId`),
    INDEX `InventoryTransaction_type_idx`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Expense` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `amountPence` INTEGER NOT NULL,
    `taxPence` INTEGER NOT NULL DEFAULT 0,
    `vendor` VARCHAR(191) NULL,
    `paymentMethod` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PAID',
    `incurredAt` DATETIME(3) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `garageId` VARCHAR(191) NOT NULL,

    INDEX `Expense_garageId_idx`(`garageId`),
    INDEX `Expense_category_idx`(`category`),
    INDEX `Expense_incurredAt_idx`(`incurredAt`),
    INDEX `Expense_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GarageInquiry` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `message` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'NEW',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `garageId` VARCHAR(191) NOT NULL,

    INDEX `GarageInquiry_garageId_idx`(`garageId`),
    INDEX `GarageInquiry_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `id` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `customerName` VARCHAR(191) NOT NULL,
    `customerEmail` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `response` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `garageId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Review_customerEmail_key`(`customerEmail`),
    INDEX `Review_garageId_idx`(`garageId`),
    INDEX `Review_status_idx`(`status`),
    INDEX `Review_rating_idx`(`rating`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GarageSignup` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NULL,
    `emailVerified` BOOLEAN NOT NULL DEFAULT false,
    `phoneVerified` BOOLEAN NOT NULL DEFAULT false,
    `emailToken` VARCHAR(191) NULL,
    `emailTokenExpires` DATETIME(3) NULL,
    `phoneOtp` VARCHAR(191) NULL,
    `phoneOtpExpires` DATETIME(3) NULL,
    `garageName` VARCHAR(191) NULL,
    `postcode` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `businessType` VARCHAR(191) NULL,
    `selectedPlan` VARCHAR(191) NULL,
    `proofPhotoUrl` VARCHAR(191) NULL,
    `proofCardUrl` VARCHAR(191) NULL,
    `companyNumber` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `GarageSignup_email_idx`(`email`),
    INDEX `GarageSignup_phone_idx`(`phone`),
    INDEX `GarageSignup_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `emailOptOut` BOOLEAN NOT NULL DEFAULT false,
    `smsOptOut` BOOLEAN NOT NULL DEFAULT false,
    `unsubscribedAt` DATETIME(3) NULL,
    `unsubscribeToken` VARCHAR(191) NULL,
    `lastCampaignSentAt` DATETIME(3) NULL,
    `source` VARCHAR(191) NULL DEFAULT 'GARAGE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `garageId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Customer_unsubscribeToken_key`(`unsubscribeToken`),
    INDEX `Customer_garageId_idx`(`garageId`),
    INDEX `Customer_email_idx`(`email`),
    INDEX `Customer_emailOptOut_idx`(`emailOptOut`),
    INDEX `Customer_smsOptOut_idx`(`smsOptOut`),
    UNIQUE INDEX `Customer_garageId_email_key`(`garageId`, `email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vehicle` (
    `id` VARCHAR(191) NOT NULL,
    `vrm` VARCHAR(191) NOT NULL,
    `make` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `motExpiry` DATETIME(3) NOT NULL,
    `ownerName` VARCHAR(191) NOT NULL,
    `ownerPhone` VARCHAR(191) NULL,
    `ownerEmail` VARCHAR(191) NULL,
    `lastService` DATETIME(3) NULL,
    `mileage` INTEGER NULL,
    `taxExpiry` DATETIME(3) NULL,
    `taxStatus` VARCHAR(191) NULL,
    `typeApproval` VARCHAR(191) NULL,
    `batteryInstallDate` DATETIME(3) NULL,
    `batteryBrand` VARCHAR(191) NULL,
    `batteryVoltage` DOUBLE NULL,
    `batteryCCA` INTEGER NULL,
    `batteryHealth` INTEGER NULL,
    `batteryLastChecked` DATETIME(3) NULL,
    `tyreFrontLeftDepth` DOUBLE NULL,
    `tyreFrontRightDepth` DOUBLE NULL,
    `tyreRearLeftDepth` DOUBLE NULL,
    `tyreRearRightDepth` DOUBLE NULL,
    `tyreSize` VARCHAR(191) NULL,
    `tyreBrand` VARCHAR(191) NULL,
    `tyreLastChecked` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `garageId` VARCHAR(191) NOT NULL,
    `customerId` VARCHAR(191) NULL,

    INDEX `Vehicle_garageId_idx`(`garageId`),
    INDEX `Vehicle_customerId_idx`(`customerId`),
    INDEX `Vehicle_taxExpiry_idx`(`taxExpiry`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Advisory` (
    `id` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `estPricePence` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `vehicleId` VARCHAR(191) NOT NULL,

    INDEX `Advisory_vehicleId_idx`(`vehicleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recall` (
    `id` VARCHAR(191) NOT NULL,
    `vrm` VARCHAR(191) NOT NULL,
    `make` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `buildDateFrom` VARCHAR(191) NULL,
    `buildDateTo` VARCHAR(191) NULL,
    `recallTitle` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `risk` VARCHAR(191) NOT NULL,
    `remedy` VARCHAR(191) NOT NULL,
    `issuedDate` DATETIME(3) NOT NULL,
    `notified` BOOLEAN NOT NULL DEFAULT false,
    `notifiedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `vehicleId` VARCHAR(191) NOT NULL,

    INDEX `Recall_vehicleId_idx`(`vehicleId`),
    INDEX `Recall_notified_idx`(`notified`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HealthCheck` (
    `id` VARCHAR(191) NOT NULL,
    `checkNumber` VARCHAR(191) NOT NULL,
    `checkedBy` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `vehicleId` VARCHAR(191) NOT NULL,
    `garageId` VARCHAR(191) NOT NULL,
    `pdfUrl` VARCHAR(191) NULL,
    `emailedAt` DATETIME(3) NULL,
    `customerViewed` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `HealthCheck_checkNumber_key`(`checkNumber`),
    INDEX `HealthCheck_vehicleId_idx`(`vehicleId`),
    INDEX `HealthCheck_garageId_idx`(`garageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HealthCheckItem` (
    `id` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `item` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `estimatedCost` INTEGER NULL,
    `urgency` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `healthCheckId` VARCHAR(191) NOT NULL,

    INDEX `HealthCheckItem_healthCheckId_idx`(`healthCheckId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reminder` (
    `id` VARCHAR(191) NOT NULL,
    `channel` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `scheduledFor` DATETIME(3) NULL,
    `sentAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `vehicleId` VARCHAR(191) NOT NULL,

    INDEX `Reminder_vehicleId_idx`(`vehicleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WebPushSubscription` (
    `id` VARCHAR(191) NOT NULL,
    `endpoint` VARCHAR(191) NOT NULL,
    `p256dh` VARCHAR(191) NOT NULL,
    `auth` VARCHAR(191) NOT NULL,
    `userAgent` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `garageId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `WebPushSubscription_endpoint_key`(`endpoint`),
    INDEX `WebPushSubscription_userId_idx`(`userId`),
    INDEX `WebPushSubscription_garageId_idx`(`garageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReminderConfig` (
    `id` VARCHAR(191) NOT NULL,
    `garageId` VARCHAR(191) NOT NULL,
    `motDaysCsv` VARCHAR(191) NOT NULL DEFAULT '30,14,7',
    `taxDaysCsv` VARCHAR(191) NOT NULL DEFAULT '30,14,7',
    `serviceMonthsCsv` VARCHAR(191) NOT NULL DEFAULT '',
    `motEnabled` BOOLEAN NOT NULL DEFAULT true,
    `taxEnabled` BOOLEAN NOT NULL DEFAULT true,
    `serviceEnabled` BOOLEAN NOT NULL DEFAULT false,
    `emailNotifications` BOOLEAN NOT NULL DEFAULT true,
    `weeklyReports` BOOLEAN NOT NULL DEFAULT true,
    `reminderSent` BOOLEAN NOT NULL DEFAULT true,
    `jobUpdates` BOOLEAN NOT NULL DEFAULT true,
    `bookingRequests` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ReminderConfig_garageId_key`(`garageId`),
    INDEX `ReminderConfig_garageId_idx`(`garageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Campaign` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NULL,
    `channel` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'DRAFT',
    `targetAudience` VARCHAR(191) NOT NULL DEFAULT 'all',
    `scheduledFor` DATETIME(3) NULL,
    `sentCount` INTEGER NOT NULL DEFAULT 0,
    `failedCount` INTEGER NOT NULL DEFAULT 0,
    `skippedCount` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `garageId` VARCHAR(191) NOT NULL,

    INDEX `Campaign_garageId_idx`(`garageId`),
    INDEX `Campaign_status_idx`(`status`),
    INDEX `Campaign_scheduledFor_idx`(`scheduledFor`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CampaignRecipient` (
    `id` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `sentAt` DATETIME(3) NULL,
    `errorMessage` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `campaignId` VARCHAR(191) NOT NULL,
    `customerId` VARCHAR(191) NOT NULL,

    INDEX `CampaignRecipient_campaignId_idx`(`campaignId`),
    INDEX `CampaignRecipient_customerId_idx`(`customerId`),
    INDEX `CampaignRecipient_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmailQueueJob` (
    `id` VARCHAR(191) NOT NULL,
    `garageId` VARCHAR(191) NOT NULL,
    `customerId` VARCHAR(191) NULL,
    `campaignId` VARCHAR(191) NULL,
    `recipientEmail` VARCHAR(191) NOT NULL,
    `recipientName` VARCHAR(191) NULL,
    `subject` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `attempts` INTEGER NOT NULL DEFAULT 0,
    `maxAttempts` INTEGER NOT NULL DEFAULT 5,
    `lastError` VARCHAR(191) NULL,
    `scheduledFor` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `processingAt` DATETIME(3) NULL,
    `sentAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `EmailQueueJob_status_scheduledFor_idx`(`status`, `scheduledFor`),
    INDEX `EmailQueueJob_garageId_idx`(`garageId`),
    INDEX `EmailQueueJob_campaignId_idx`(`campaignId`),
    INDEX `EmailQueueJob_recipientEmail_idx`(`recipientEmail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ApiConfig` (
    `id` VARCHAR(191) NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ApiConfig_key_key`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Job` (
    `id` VARCHAR(191) NOT NULL,
    `jobNumber` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'TODO',
    `description` VARCHAR(191) NULL,
    `bookedDate` DATETIME(3) NULL,
    `startedAt` DATETIME(3) NULL,
    `completedAt` DATETIME(3) NULL,
    `estimatedHours` DOUBLE NULL,
    `actualHours` DOUBLE NULL,
    `laborRate` INTEGER NOT NULL DEFAULT 5000,
    `laborTotal` INTEGER NOT NULL DEFAULT 0,
    `partsTotal` INTEGER NOT NULL DEFAULT 0,
    `vatRate` DOUBLE NOT NULL DEFAULT 20.0,
    `discountPence` INTEGER NOT NULL DEFAULT 0,
    `totalPence` INTEGER NOT NULL DEFAULT 0,
    `notes` VARCHAR(191) NULL,
    `bookingId` VARCHAR(191) NULL,
    `source` VARCHAR(191) NULL DEFAULT 'GARAGE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `vehicleId` VARCHAR(191) NOT NULL,
    `garageId` VARCHAR(191) NOT NULL,
    `assignedToId` VARCHAR(191) NULL,

    UNIQUE INDEX `Job_jobNumber_key`(`jobNumber`),
    UNIQUE INDEX `Job_bookingId_key`(`bookingId`),
    INDEX `Job_garageId_idx`(`garageId`),
    INDEX `Job_vehicleId_idx`(`vehicleId`),
    INDEX `Job_status_idx`(`status`),
    INDEX `Job_assignedToId_idx`(`assignedToId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobItem` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `quantity` DOUBLE NOT NULL DEFAULT 1,
    `unitPricePence` INTEGER NOT NULL,
    `totalPence` INTEGER NOT NULL,
    `supplierCost` INTEGER NULL,
    `partNumber` VARCHAR(191) NULL,
    `fromInventory` BOOLEAN NOT NULL DEFAULT false,
    `inventoryItemId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `jobId` VARCHAR(191) NOT NULL,

    INDEX `JobItem_jobId_idx`(`jobId`),
    INDEX `JobItem_inventoryItemId_idx`(`inventoryItemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Invoice` (
    `id` VARCHAR(191) NOT NULL,
    `invoiceNumber` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'UNPAID',
    `issuedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dueDate` DATETIME(3) NOT NULL,
    `paidDate` DATETIME(3) NULL,
    `subtotalPence` INTEGER NOT NULL,
    `vatPence` INTEGER NOT NULL,
    `totalPence` INTEGER NOT NULL,
    `paidPence` INTEGER NOT NULL DEFAULT 0,
    `balancePence` INTEGER NOT NULL,
    `paymentMethod` VARCHAR(191) NULL,
    `stripePaymentId` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `source` VARCHAR(191) NULL DEFAULT 'GARAGE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `jobId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Invoice_invoiceNumber_key`(`invoiceNumber`),
    UNIQUE INDEX `Invoice_jobId_key`(`jobId`),
    INDEX `Invoice_status_idx`(`status`),
    INDEX `Invoice_dueDate_idx`(`dueDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quote` (
    `id` VARCHAR(191) NOT NULL,
    `quoteNumber` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'DRAFT',
    `issuedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiryDate` DATETIME(3) NOT NULL,
    `acceptedDate` DATETIME(3) NULL,
    `declinedDate` DATETIME(3) NULL,
    `declineReason` VARCHAR(191) NULL,
    `subtotalPence` INTEGER NOT NULL,
    `vatRate` DOUBLE NOT NULL DEFAULT 20.0,
    `vatPence` INTEGER NOT NULL,
    `totalPence` INTEGER NOT NULL,
    `customerName` VARCHAR(191) NOT NULL,
    `customerEmail` VARCHAR(191) NOT NULL,
    `customerPhone` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `vehicleId` VARCHAR(191) NOT NULL,
    `garageId` VARCHAR(191) NOT NULL,
    `jobId` VARCHAR(191) NULL,
    `invoiceId` VARCHAR(191) NULL,

    UNIQUE INDEX `Quote_quoteNumber_key`(`quoteNumber`),
    UNIQUE INDEX `Quote_invoiceId_key`(`invoiceId`),
    INDEX `Quote_status_idx`(`status`),
    INDEX `Quote_garageId_idx`(`garageId`),
    INDEX `Quote_vehicleId_idx`(`vehicleId`),
    INDEX `Quote_expiryDate_idx`(`expiryDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuoteItem` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `quantity` DOUBLE NOT NULL DEFAULT 1,
    `unitPricePence` INTEGER NOT NULL,
    `totalPence` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `quoteId` VARCHAR(191) NOT NULL,

    INDEX `QuoteItem_quoteId_idx`(`quoteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuoteActivity` (
    `id` VARCHAR(191) NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `details` VARCHAR(191) NULL,
    `quoteId` VARCHAR(191) NOT NULL,

    INDEX `QuoteActivity_quoteId_idx`(`quoteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` VARCHAR(191) NOT NULL,
    `amountPence` INTEGER NOT NULL,
    `method` VARCHAR(191) NOT NULL,
    `reference` VARCHAR(191) NULL,
    `stripePaymentId` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `invoiceId` VARCHAR(191) NOT NULL,

    INDEX `Payment_invoiceId_idx`(`invoiceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `category` VARCHAR(191) NOT NULL,
    `durationMinutes` INTEGER NOT NULL DEFAULT 60,
    `pricePence` INTEGER NOT NULL,
    `depositRequired` BOOLEAN NOT NULL DEFAULT false,
    `depositPence` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `garageId` VARCHAR(191) NOT NULL,

    INDEX `Service_garageId_idx`(`garageId`),
    INDEX `Service_category_idx`(`category`),
    INDEX `Service_isActive_idx`(`isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `id` VARCHAR(191) NOT NULL,
    `bookingNumber` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `customerName` VARCHAR(191) NOT NULL,
    `customerEmail` VARCHAR(191) NOT NULL,
    `customerPhone` VARCHAR(191) NOT NULL,
    `vehicleVrm` VARCHAR(191) NULL,
    `vehicleMake` VARCHAR(191) NULL,
    `vehicleModel` VARCHAR(191) NULL,
    `bookingDate` DATETIME(3) NOT NULL,
    `bookingTime` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `depositPaid` BOOLEAN NOT NULL DEFAULT false,
    `depositPence` INTEGER NOT NULL DEFAULT 0,
    `stripePaymentIntentId` VARCHAR(191) NULL,
    `stripePaymentStatus` VARCHAR(191) NULL,
    `confirmedAt` DATETIME(3) NULL,
    `cancelledAt` DATETIME(3) NULL,
    `cancellationReason` VARCHAR(191) NULL,
    `completedAt` DATETIME(3) NULL,
    `jobId` VARCHAR(191) NULL,
    `convertedToJob` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `garageId` VARCHAR(191) NOT NULL,
    `serviceId` VARCHAR(191) NOT NULL,
    `staffId` VARCHAR(191) NULL,

    UNIQUE INDEX `Booking_bookingNumber_key`(`bookingNumber`),
    UNIQUE INDEX `Booking_jobId_key`(`jobId`),
    INDEX `Booking_garageId_idx`(`garageId`),
    INDEX `Booking_serviceId_idx`(`serviceId`),
    INDEX `Booking_status_idx`(`status`),
    INDEX `Booking_bookingDate_idx`(`bookingDate`),
    INDEX `Booking_customerEmail_idx`(`customerEmail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Garage` ADD CONSTRAINT `Garage_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GarageImage` ADD CONSTRAINT `GarageImage_garageId_fkey` FOREIGN KEY (`garageId`) REFERENCES `Garage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Staff` ADD CONSTRAINT `Staff_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Staff` ADD CONSTRAINT `Staff_garageId_fkey` FOREIGN KEY (`garageId`) REFERENCES `Garage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryItem` ADD CONSTRAINT `InventoryItem_garageId_fkey` FOREIGN KEY (`garageId`) REFERENCES `Garage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryTransaction` ADD CONSTRAINT `InventoryTransaction_inventoryItemId_fkey` FOREIGN KEY (`inventoryItemId`) REFERENCES `InventoryItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryTransaction` ADD CONSTRAINT `InventoryTransaction_garageId_fkey` FOREIGN KEY (`garageId`) REFERENCES `Garage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Expense` ADD CONSTRAINT `Expense_garageId_fkey` FOREIGN KEY (`garageId`) REFERENCES `Garage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GarageInquiry` ADD CONSTRAINT `GarageInquiry_garageId_fkey` FOREIGN KEY (`garageId`) REFERENCES `Garage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_garageId_fkey` FOREIGN KEY (`garageId`) REFERENCES `Garage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_garageId_fkey` FOREIGN KEY (`garageId`) REFERENCES `Garage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vehicle` ADD CONSTRAINT `Vehicle_garageId_fkey` FOREIGN KEY (`garageId`) REFERENCES `Garage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vehicle` ADD CONSTRAINT `Vehicle_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Advisory` ADD CONSTRAINT `Advisory_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `Vehicle`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recall` ADD CONSTRAINT `Recall_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `Vehicle`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HealthCheck` ADD CONSTRAINT `HealthCheck_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `Vehicle`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HealthCheck` ADD CONSTRAINT `HealthCheck_garageId_fkey` FOREIGN KEY (`garageId`) REFERENCES `Garage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HealthCheckItem` ADD CONSTRAINT `HealthCheckItem_healthCheckId_fkey` FOREIGN KEY (`healthCheckId`) REFERENCES `HealthCheck`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reminder` ADD CONSTRAINT `Reminder_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `Vehicle`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WebPushSubscription` ADD CONSTRAINT `WebPushSubscription_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WebPushSubscription` ADD CONSTRAINT `WebPushSubscription_garageId_fkey` FOREIGN KEY (`garageId`) REFERENCES `Garage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReminderConfig` ADD CONSTRAINT `ReminderConfig_garageId_fkey` FOREIGN KEY (`garageId`) REFERENCES `Garage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Campaign` ADD CONSTRAINT `Campaign_garageId_fkey` FOREIGN KEY (`garageId`) REFERENCES `Garage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignRecipient` ADD CONSTRAINT `CampaignRecipient_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignRecipient` ADD CONSTRAINT `CampaignRecipient_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmailQueueJob` ADD CONSTRAINT `EmailQueueJob_garageId_fkey` FOREIGN KEY (`garageId`) REFERENCES `Garage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmailQueueJob` ADD CONSTRAINT `EmailQueueJob_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `Vehicle`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_garageId_fkey` FOREIGN KEY (`garageId`) REFERENCES `Garage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_assignedToId_fkey` FOREIGN KEY (`assignedToId`) REFERENCES `Staff`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobItem` ADD CONSTRAINT `JobItem_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `Job`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `Job`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quote` ADD CONSTRAINT `Quote_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `Vehicle`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quote` ADD CONSTRAINT `Quote_garageId_fkey` FOREIGN KEY (`garageId`) REFERENCES `Garage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quote` ADD CONSTRAINT `Quote_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `Job`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quote` ADD CONSTRAINT `Quote_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `Invoice`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuoteItem` ADD CONSTRAINT `QuoteItem_quoteId_fkey` FOREIGN KEY (`quoteId`) REFERENCES `Quote`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuoteActivity` ADD CONSTRAINT `QuoteActivity_quoteId_fkey` FOREIGN KEY (`quoteId`) REFERENCES `Quote`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `Invoice`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_garageId_fkey` FOREIGN KEY (`garageId`) REFERENCES `Garage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_staffId_fkey` FOREIGN KEY (`staffId`) REFERENCES `Staff`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

