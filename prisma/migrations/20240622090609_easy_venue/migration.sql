-- CreateTable
CREATE TABLE "EmailCredentials" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailCredentials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailCredentials_email_key" ON "EmailCredentials"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EmailCredentials_userId_key" ON "EmailCredentials"("userId");

-- AddForeignKey
ALTER TABLE "EmailCredentials" ADD CONSTRAINT "EmailCredentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
