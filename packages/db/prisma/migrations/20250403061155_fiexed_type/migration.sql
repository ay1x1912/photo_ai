/*
  Warnings:

  - You are about to drop the column `modelId` on the `OutputImage` table. All the data in the column will be lost.
  - You are about to drop the `Model` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `modleId` to the `OutputImage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OutputImage" DROP CONSTRAINT "OutputImage_modelId_fkey";

-- DropForeignKey
ALTER TABLE "TraingImages" DROP CONSTRAINT "TraingImages_modelId_fkey";

-- AlterTable
ALTER TABLE "OutputImage" DROP COLUMN "modelId",
ADD COLUMN     "modleId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Model";

-- CreateTable
CREATE TABLE "Modle" (
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

    CONSTRAINT "Modle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TraingImages" ADD CONSTRAINT "TraingImages_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Modle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutputImage" ADD CONSTRAINT "OutputImage_modleId_fkey" FOREIGN KEY ("modleId") REFERENCES "Modle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
