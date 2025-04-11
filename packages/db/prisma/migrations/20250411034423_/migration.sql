/*
  Warnings:

  - You are about to drop the `TraingImages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TraingImages" DROP CONSTRAINT "TraingImages_modelId_fkey";

-- DropTable
DROP TABLE "TraingImages";
