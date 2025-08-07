-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "credits" INTEGER NOT NULL DEFAULT 10;

-- CreateTable
CREATE TABLE "public"."image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."image" ADD CONSTRAINT "image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
