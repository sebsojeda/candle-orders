/*
  Warnings:

  - Changed the type of `category` on the `Fragrance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Citrus', 'Floral', 'Fresh', 'Fruity', 'Herbaceous', 'Smokey', 'Woody');

-- AlterTable
ALTER TABLE "Fragrance" DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL;
