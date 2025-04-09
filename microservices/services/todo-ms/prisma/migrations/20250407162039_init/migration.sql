-- CreateTable
CREATE TABLE "UserWithTodo" (
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserWithTodo_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserWithTodo"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
