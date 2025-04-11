/*
  Warnings:

  - The values [Asian_American,East_Asina,South_East_Asain,South_Asina,Middle_East] on the enum `Ethinicity` will be removed. If these variants are still used in the database, this will fail.
  - The values [Hazel_Green] on the enum `EyeColor` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Ethinicity_new" AS ENUM ('White', 'Black', 'Asian American', 'East Asian', 'South East Asian', 'South Asian', 'Middle East', 'Pacific', 'Hispanic');
ALTER TABLE "Model" ALTER COLUMN "ethinicity" TYPE "Ethinicity_new" USING ("ethinicity"::text::"Ethinicity_new");
ALTER TYPE "Ethinicity" RENAME TO "Ethinicity_old";
ALTER TYPE "Ethinicity_new" RENAME TO "Ethinicity";
DROP TYPE "Ethinicity_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "EyeColor_new" AS ENUM ('Brown', 'Blue', 'Hazel Green', 'Gray');
ALTER TABLE "Model" ALTER COLUMN "eyeColor" TYPE "EyeColor_new" USING ("eyeColor"::text::"EyeColor_new");
ALTER TYPE "EyeColor" RENAME TO "EyeColor_old";
ALTER TYPE "EyeColor_new" RENAME TO "EyeColor";
DROP TYPE "EyeColor_old";
COMMIT;
