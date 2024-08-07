-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cnpj" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fantasy" TEXT,
    "address" TEXT NOT NULL,
    "number" INTEGER,
    "complement" TEXT,
    "cep" INTEGER NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);
INSERT INTO "new_Client" ("address", "cep", "city", "cnpj", "complement", "district", "email", "fantasy", "id", "name", "number", "phone", "state") SELECT "address", "cep", "city", "cnpj", "complement", "district", "email", "fantasy", "id", "name", "number", "phone", "state" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_id_key" ON "Client"("id");
CREATE UNIQUE INDEX "Client_cnpj_key" ON "Client"("cnpj");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
