/*
  Warnings:

  - You are about to drop the column `tesnorPath` on the `Model` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Model" DROP COLUMN "tesnorPath",
ADD COLUMN     "tensorPath" TEXT;
