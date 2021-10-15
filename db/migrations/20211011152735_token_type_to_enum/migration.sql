/*
  Warnings:

  - A unique constraint covering the columns `[hashed_token,type]` on the table `token` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `type` on the `token` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('RESET_PASSWORD');

-- AlterTable
ALTER TABLE "token" DROP COLUMN "type",
ADD COLUMN     "type" "TokenType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "token_hashed_token_type_key" ON "token"("hashed_token", "type");
