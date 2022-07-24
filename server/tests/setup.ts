import dotenv from "dotenv";

export default async () => {
  dotenv.config();
  process.env.NODE_ENV = "test";
};
