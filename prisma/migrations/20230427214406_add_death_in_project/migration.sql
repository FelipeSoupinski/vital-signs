-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "death_date" TIMESTAMP(3),
ADD COLUMN     "is_dead" BOOLEAN NOT NULL DEFAULT false;
