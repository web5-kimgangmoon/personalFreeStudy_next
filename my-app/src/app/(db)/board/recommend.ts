import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  NotNull,
  PrimaryKey,
  Table,
  Model,
} from "sequelize-typescript";
import User from "./user";
import Board from "./board";

@Table({
  tableName: "recommend",
  underscored: true,
  timestamps: true,
})
export default class Recommend extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER.UNSIGNED)
  id!: number;

  @ForeignKey(() => Board)
  @NotNull
  @Column({ type: DataType.INTEGER.UNSIGNED, allowNull: false })
  boardId!: number;

  @ForeignKey(() => User)
  @NotNull
  @Column({ type: DataType.INTEGER.UNSIGNED, allowNull: false })
  writerId!: number;

  @Default(true)
  @Column(DataType.BOOLEAN)
  isRecommend!: boolean;

  @BelongsTo(() => Board)
  board!: Board;

  @BelongsTo(() => User)
  user!: User;
}
