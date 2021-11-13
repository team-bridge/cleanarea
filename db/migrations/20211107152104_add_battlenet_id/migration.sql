/*
  Warnings:

  - A unique constraint covering the columns `[battlenet_id]` on the table `blizzard_battlenet_account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `battlenet_id` to the `blizzard_battlenet_account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blizzard_battlenet_account" ADD COLUMN     "battlenet_id" BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "blizzard_battlenet_account_battlenet_id_key" ON "blizzard_battlenet_account"("battlenet_id");
