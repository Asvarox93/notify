import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  HOST: process.env.dbHost,
  USER: process.env.dbUser,
  PASSWORD: process.env.dbPassword,
  DB: process.env.dbDatabase,
  PORT: process.env.dbPort || 5432,
  DIALECT: process.env.dbDialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export default dbConfig;
