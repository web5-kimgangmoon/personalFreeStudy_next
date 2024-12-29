import {
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  NotNull,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Recommend from "./recommend";
import Board from "./board";
import Comment from "./comment";

@Table({
  tableName: "user",
  underscored: true,
  timestamps: true,
})
export default class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER.UNSIGNED)
  id!: number;

  @NotNull
  @Column({ type: DataType.CHAR(24), allowNull: false })
  nick!: string;

  @NotNull
  @Column({ type: DataType.CHAR(36), allowNull: false })
  strId!: string;

  @NotNull
  @Column({ type: DataType.CHAR(100), allowNull: false })
  pwd!: string;

  // @BelongsToMany(() => Board, () => Recommend)
  // recommendBoard!: Array<Board & { Recommend: Recommend }>;

  // @BelongsToMany(() => Board, () => Comment)
  // commentBoard!: Array<Board & { Comment: Comment }>;

  @HasMany(() => Board)
  board!: Board[];

  @HasMany(() => Comment)
  comment!: Comment[];

  @HasMany(() => Recommend)
  recommend!: Recommend[];
}
