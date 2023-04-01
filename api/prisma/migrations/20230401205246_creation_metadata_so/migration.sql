-- CreateEnum
CREATE TYPE "Status" AS ENUM ('RUNNING', 'FINISHED', 'LIMIT_REACHED', 'ERROR');

-- CreateTable
CREATE TABLE "MetadataSO" (
    "id" SERIAL NOT NULL,
    "project_tag" VARCHAR(255) NOT NULL,
    "mining_start_date" TIMESTAMP(3),
    "mining_end_date" TIMESTAMP(3),
    "execution_start_time" TIMESTAMP(3) NOT NULL,
    "execution_end_time" TIMESTAMP(3),
    "last_question_id" INTEGER NOT NULL,
    "last_question_time" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'RUNNING',

    CONSTRAINT "MetadataSO_pkey" PRIMARY KEY ("id")
);
