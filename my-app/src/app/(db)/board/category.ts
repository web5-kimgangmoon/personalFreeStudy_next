import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  NotNull,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Board from "./board";

@Table({
  tableName: "category",
  underscored: true,
  timestamps: true,
})
export default class Category extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER.UNSIGNED)
  id!: number;

  @NotNull
  @Column({ type: DataType.CHAR(20), allowNull: false })
  title!: string;

  @HasMany(() => Board)
  board!: Board[];
}
