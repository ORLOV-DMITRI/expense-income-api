/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - Added the required column `hash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ExpenseFormType" AS ENUM ('Full', 'Single');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
DROP COLUMN "password",
ADD COLUMN     "hash" TEXT NOT NULL,
ADD COLUMN     "salt" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpenseList" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "ExpenseList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpenseItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "count" INTEGER,
    "price" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expenseListId" INTEGER NOT NULL,

    CONSTRAINT "ExpenseItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpenseType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "formType" "ExpenseFormType" NOT NULL,

    CONSTRAINT "ExpenseType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_ownerId_key" ON "Account"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "ExpenseList_ownerId_key" ON "ExpenseList"("ownerId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseList" ADD CONSTRAINT "ExpenseList_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseItem" ADD CONSTRAINT "ExpenseItem_expenseListId_fkey" FOREIGN KEY ("expenseListId") REFERENCES "ExpenseList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
