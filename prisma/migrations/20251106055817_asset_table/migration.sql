-- CreateTable
CREATE TABLE "Asset" (
    "id" SERIAL NOT NULL,
    "assetName" TEXT NOT NULL,
    "assetAmount" INTEGER NOT NULL,
    "dollarAmount" INTEGER NOT NULL,
    "avgBuyPrice" INTEGER NOT NULL,
    "profitLoss" INTEGER NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);
