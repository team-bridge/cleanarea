-- AlterTable
ALTER TABLE "user" ADD COLUMN     "riot_account_id" INTEGER;

-- CreateTable
CREATE TABLE "riot_account" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "puuid" TEXT NOT NULL,
    "game_name" TEXT NOT NULL,
    "tag_line" TEXT NOT NULL,

    CONSTRAINT "riot_account_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_riot_account_id_fkey" FOREIGN KEY ("riot_account_id") REFERENCES "riot_account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
