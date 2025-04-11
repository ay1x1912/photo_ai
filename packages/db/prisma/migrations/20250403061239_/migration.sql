/*
  Warnings:

  - You are about to drop the column `modleId` on the `OutputImage` table. All the data in the column will be lost.
  - You are about to drop the `Modle` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `modelId` to the `OutputImage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OutputImage" DROP CONSTRAINT "OutputImage_modleId_fkey";

-- DropForeignKey
ALTER TABLE "TraingImages" DROP CONSTRAINT "TraingImages_modelId_fkey";

-- AlterTable
ALTER TABLE "OutputImage" DROP COLUMN "modleId",
ADD COLUMN     "modelId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Modle";

-- CreateTable
CREATE TABLE "Model" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "type" "Type" NOT NULL,
    "ethinicity" "Ethinicity" NOT NULL,
    "eyeColor" "EyeColor" NOT NULL,
    "bold" BOOLEAN NOT NULL,
    "imageUrl" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TraingImages" ADD CONSTRAINT "TraingImages_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutputImage" ADD CONSTRAINT "OutputImage_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
