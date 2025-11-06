/*
  Warnings:

  - You are about to drop the column `avgBuyPrice` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `profitLoss` on the `Asset` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "avgBuyPrice",
DROP COLUMN "profitLoss",
ALTER COLUMN "assetAmount" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "dollarAmount" SET DATA TYPE DECIMAL(65,30);
