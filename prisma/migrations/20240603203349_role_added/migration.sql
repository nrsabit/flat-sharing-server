-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('user', 'admin');

-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "role" "UserRoles" NOT NULL DEFAULT 'user';
