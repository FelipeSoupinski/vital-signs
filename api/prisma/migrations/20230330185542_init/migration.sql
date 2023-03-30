-- CreateTable
CREATE TABLE "Question" (
    "question_id" INTEGER NOT NULL,
    "tag" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "body" TEXT,
    "link" TEXT,
    "creation_date" TIMESTAMP(3),
    "is_answered" BOOLEAN,
    "accepted_answer_id" INTEGER,
    "score" INTEGER,
    "answer_count" INTEGER,
    "up_vote_count" INTEGER,
    "down_vote_count" INTEGER,
    "favorite_count" INTEGER,
    "view_count" INTEGER,
    "close_vote_count" INTEGER,
    "delete_vote_count" INTEGER,
    "comment_count" INTEGER,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("question_id")
);
