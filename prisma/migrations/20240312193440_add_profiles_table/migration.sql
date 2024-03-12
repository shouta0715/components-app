-- CreateTable
CREATE TABLE "profiles" (
    "userId" TEXT NOT NULL,
    "website" TEXT,
    "github" TEXT,
    "twitter" TEXT,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
