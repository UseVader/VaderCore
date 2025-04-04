-- CreateEnum
CREATE TYPE "CommandType" AS ENUM ('USER_DEFINED', 'PREDEFINED');

-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL,
    "displayName" TEXT,
    "email" TEXT,
    "photoURL" TEXT,
    "refreshToken" TEXT,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "providerRefreshToken" TEXT,
    "providerAccessToken" TEXT,
    "providerScope" TEXT,
    "loggedIn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Command" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "cmd" TEXT NOT NULL,
    "type" "CommandType" NOT NULL DEFAULT 'USER_DEFINED',
    "createdBy" TEXT,
    "isInputRequired" BOOLEAN NOT NULL DEFAULT false,
    "requiresUserWarning" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Command_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Script" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "alias" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "revision" INTEGER NOT NULL DEFAULT 0,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Script_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScriptCommand" (
    "id" TEXT NOT NULL,
    "scriptId" TEXT NOT NULL,
    "commandId" TEXT NOT NULL,
    "inputArgs" TEXT,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScriptCommand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommandOutput" (
    "id" TEXT NOT NULL,
    "scriptCommandId" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "isSuccessfulExecution" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommandOutput_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExecutionLogCommandOutput" (
    "id" TEXT NOT NULL,
    "executionLogId" TEXT NOT NULL,
    "commandOutputId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExecutionLogCommandOutput_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExecutionLog" (
    "id" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,
    "scriptId" TEXT NOT NULL,
    "executedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExecutionLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Script_alias_key" ON "Script"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "ScriptCommand_commandId_scriptId_key" ON "ScriptCommand"("commandId", "scriptId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Command" ADD CONSTRAINT "Command_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Script" ADD CONSTRAINT "Script_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScriptCommand" ADD CONSTRAINT "ScriptCommand_scriptId_fkey" FOREIGN KEY ("scriptId") REFERENCES "Script"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScriptCommand" ADD CONSTRAINT "ScriptCommand_commandId_fkey" FOREIGN KEY ("commandId") REFERENCES "Command"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommandOutput" ADD CONSTRAINT "CommandOutput_scriptCommandId_fkey" FOREIGN KEY ("scriptCommandId") REFERENCES "ScriptCommand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExecutionLogCommandOutput" ADD CONSTRAINT "ExecutionLogCommandOutput_executionLogId_fkey" FOREIGN KEY ("executionLogId") REFERENCES "ExecutionLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExecutionLogCommandOutput" ADD CONSTRAINT "ExecutionLogCommandOutput_commandOutputId_fkey" FOREIGN KEY ("commandOutputId") REFERENCES "CommandOutput"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExecutionLog" ADD CONSTRAINT "ExecutionLog_scriptId_fkey" FOREIGN KEY ("scriptId") REFERENCES "Script"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExecutionLog" ADD CONSTRAINT "ExecutionLog_executedBy_fkey" FOREIGN KEY ("executedBy") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
