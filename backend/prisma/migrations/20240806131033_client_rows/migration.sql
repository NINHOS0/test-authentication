/*
  Warnings:

  - You are about to drop the column `telefone` on the `Client` table. All the data in the column will be lost.
  - You are about to alter the column `cep` on the `Client` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `number` on the `Client` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `phone` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cnpj" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fantasy" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "complement" TEXT NOT NULL,
    "cep" INTEGER NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);
INSERT INTO "new_Client" ("address", "cep", "city", "cnpj", "complement", "district", "email", "fantasy", "id", "name", "number", "state") SELECT "address", "cep", "city", "cnpj", "complement", "district", "email", "fantasy", "id", "name", "number", "state" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_id_key" ON "Client"("id");
CREATE UNIQUE INDEX "Client_cnpj_key" ON "Client"("cnpj");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
