// src/infrastructure/database/prisma.js
const { PrismaClient } = require("@prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");

// Pass driver adapter for Prisma 7 MySQL connection
const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "crm_ddd",
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

module.exports = prisma;