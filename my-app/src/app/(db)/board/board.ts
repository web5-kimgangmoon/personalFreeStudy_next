import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  NotNull,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Category from "./category";
import User from "./user";
import Recommend from "./recommend";
import Comment from "./comment";

@Table({
  tableName: "board",
  timestamps: true,
  underscored: true,
})
export default class Board extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER.UNSIGNED)
  id!: number;

  @ForeignKey(() => Category)
  @NotNull
  @Column({ type: DataType.INTEGER.UNSIGNED, allowNull: false })
  categoryId!: number;

  @ForeignKey(() => User)
  @NotNull
  @Column({ type: DataType.INTEGER.UNSIGNED, allowNull: false })
  writerId!: number;

  @NotNull
  @Column({ type: DataType.CHAR(30), allowNull: false })
  title!: string;

  @NotNull
  @Column({ type: DataType.INTEGER.UNSIGNED, allowNull: false })
  looks!: number;

  @BelongsTo(() => User)
  writer!: User;

  @BelongsTo(() => Category)
  category!: Category;

  // @BelongsToMany(() => User, () => Recommend)
  // recommendUser!: Array<User & { Recommend: Recommend }>;

  // @BelongsToMany(() => User, () => Comment)
  // commentUser!: Array<User & { Comment: Comment }>;

  // @HasMany(() => Comment)
  // comment!: Comment;

  @HasMany(() => Comment)
  comment!: Comment[];

  @HasMany(() => Recommend)
  recommend!: Recommend[];
}
