import { Sequelize } from "sequelize";
import dbConfig from "../../database/db.config";

let sequelize

if(process.env.NODE_ENV === 'test'){
  sequelize = new Sequelize("sqlite::memory:");
} else {
  sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.DIALECT,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  });
}

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error: unknown) {
  let message = "Something goes wrong with database connection";

  if (error instanceof Error) message = error.message;

  console.error("Unable to connect to the database:", message);
}

const db: Sequelize = sequelize;

export default db;
