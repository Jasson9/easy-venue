/*
  Warnings:

  - Added the required column `capacity` to the `Venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Venue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Venue" ADD COLUMN     "amenities" TEXT[],
ADD COLUMN     "capacity" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL;
