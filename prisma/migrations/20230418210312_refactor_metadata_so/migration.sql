/*
  Warnings:

  - The values [LIMIT_REACHED] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `total_questions` to the `MetadataSO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_questions_processed` to the `MetadataSO` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('RUNNING', 'FINISHED', 'ERROR');
ALTER TABLE "MetadataSO" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "MetadataSO" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "MetadataSO" ALTER COLUMN "status" SET DEFAULT 'RUNNING';
COMMIT;

-- AlterTable
ALTER TABLE "MetadataSO" ADD COLUMN     "info_message" TEXT,
ADD COLUMN     "total_questions" INTEGER NOT NULL,
ADD COLUMN     "total_questions_processed" INTEGER NOT NULL;
