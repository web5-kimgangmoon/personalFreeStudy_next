import { Sequelize } from "sequelize-typescript";
import mysql2 from "mysql2";
import Todo from "./todo";
import Board from "./board/board";
import Category from "./board/category";
import Comment from "./board/comment";
import Recommend from "./board/recommend";
import User from "./board/user";

const todoSequelize = new Sequelize({
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

export const boardSequelize = new Sequelize({
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
  models: [Category, User, Board, Recommend, Comment],
});

export default todoSequelize;
