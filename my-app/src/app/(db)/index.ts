import { Sequelize } from "sequelize-typescript";
import mysql2 from "mysql2";
import Todo from "./todo";

const sequelize = new Sequelize({
  dialect: "mysql",
  // host:
  // username:
  // password:
  // port:
  host: "localhost",
  username: "tester",
  password: "1234qwer",
  database: "testerSite",
  dialectModule: mysql2,
  models: [Todo],
});

export default sequelize;
