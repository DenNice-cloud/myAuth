-- DropIndex
DROP INDEX "User_id_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "JWT_access" DROP NOT NULL,
ALTER COLUMN "JWT_restore" DROP NOT NULL;
