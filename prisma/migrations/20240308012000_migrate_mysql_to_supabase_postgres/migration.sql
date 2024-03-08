-- CreateEnum
CREATE TYPE "Extension" AS ENUM ('html', 'css', 'js', 'jsx', 'ts', 'tsx');

-- CreateEnum
CREATE TYPE "Responsive" AS ENUM ('mobile', 'desktop');

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "follows" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,

    CONSTRAINT "follows_pkey" PRIMARY KEY ("followerId","followingId")
);

-- CreateTable
CREATE TABLE "categories" (
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "components" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "draft" BOOLEAN NOT NULL DEFAULT true,
    "document" TEXT NOT NULL,
    "previewUrl" TEXT NOT NULL,
    "functionName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryName" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "components_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" SERIAL NOT NULL,
    "objectId" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'index',
    "extension" "Extension" NOT NULL,
    "componentId" TEXT NOT NULL,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "componentSets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "draft" BOOLEAN NOT NULL DEFAULT true,
    "document" TEXT NOT NULL,
    "previewImageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "componentSets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "componentReviews" (
    "id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "componentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "componentReviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "componentSetReviews" (
    "id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "componentSetId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "componentSetReviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "componentLikes" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "componentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "componentLikes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "componentSetLikes" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "componentSetId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "componentSetLikes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ComponentToComponentSet" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "accounts_userId_idx" ON "accounts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "follows_followerId_idx" ON "follows"("followerId");

-- CreateIndex
CREATE INDEX "follows_followingId_idx" ON "follows"("followingId");

-- CreateIndex
CREATE UNIQUE INDEX "follows_followerId_followingId_key" ON "follows"("followerId", "followingId");

-- CreateIndex
CREATE INDEX "components_creatorId_idx" ON "components"("creatorId");

-- CreateIndex
CREATE INDEX "components_categoryName_idx" ON "components"("categoryName");

-- CreateIndex
CREATE INDEX "files_componentId_idx" ON "files"("componentId");

-- CreateIndex
CREATE INDEX "files_objectId_idx" ON "files"("objectId");

-- CreateIndex
CREATE INDEX "componentSets_creatorId_idx" ON "componentSets"("creatorId");

-- CreateIndex
CREATE INDEX "componentReviews_componentId_idx" ON "componentReviews"("componentId");

-- CreateIndex
CREATE INDEX "componentReviews_userId_idx" ON "componentReviews"("userId");

-- CreateIndex
CREATE INDEX "componentSetReviews_componentSetId_idx" ON "componentSetReviews"("componentSetId");

-- CreateIndex
CREATE INDEX "componentSetReviews_userId_idx" ON "componentSetReviews"("userId");

-- CreateIndex
CREATE INDEX "componentLikes_componentId_idx" ON "componentLikes"("componentId");

-- CreateIndex
CREATE INDEX "componentLikes_userId_idx" ON "componentLikes"("userId");

-- CreateIndex
CREATE INDEX "componentSetLikes_componentSetId_idx" ON "componentSetLikes"("componentSetId");

-- CreateIndex
CREATE INDEX "componentSetLikes_userId_idx" ON "componentSetLikes"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_ComponentToComponentSet_AB_unique" ON "_ComponentToComponentSet"("A", "B");

-- CreateIndex
CREATE INDEX "_ComponentToComponentSet_B_index" ON "_ComponentToComponentSet"("B");
