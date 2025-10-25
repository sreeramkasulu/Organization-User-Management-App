// import { Sequelize } from "sequelize";

// const sequelize = new Sequelize({
//   dialect: "sqlite",
//   storage: "./database.sqlite", // creates a local file
//   logging: false,
// });

// export default sequelize;

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

export default sequelize;
