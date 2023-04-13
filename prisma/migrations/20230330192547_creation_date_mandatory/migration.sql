/*
  Warnings:

  - Made the column `creation_date` on table `Question` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "creation_date" SET NOT NULL;
