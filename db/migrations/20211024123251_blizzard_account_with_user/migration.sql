-- AlterTable
ALTER TABLE "user" ADD COLUMN     "blizzard_battlenet_account_id" INTEGER;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_blizzard_battlenet_account_id_fkey" FOREIGN KEY ("blizzard_battlenet_account_id") REFERENCES "blizzard_battlenet_account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
