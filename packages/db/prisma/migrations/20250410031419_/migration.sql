-- AlterTable
ALTER TABLE "Model" ADD COLUMN     "falAiRequest_id" TEXT,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Pending',
ADD COLUMN     "tesnorPath" TEXT,
ADD COLUMN     "trigerWord" TEXT;

-- AlterTable
ALTER TABLE "OutputImage" ADD COLUMN     "falAiRequest_id" TEXT;
