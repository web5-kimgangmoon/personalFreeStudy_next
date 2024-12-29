import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  NotNull,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Board from "./board";
import User from "./user";

@Table({
  tableName: "comment",
  timestamps: true,
  underscored: true,
})
export default class Comment extends Model {
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

  @Column(DataType.STRING(1000))
  content!: string;

  @BelongsTo(() => Board)
  board!: Board;

  @BelongsTo(() => User)
  user!: User;
}
