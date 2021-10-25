-- CreateTable
CREATE TABLE "blizzard_battlenet_account" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "battle_tag" TEXT NOT NULL,

    CONSTRAINT "blizzard_battlenet_account_pkey" PRIMARY KEY ("id")
);
