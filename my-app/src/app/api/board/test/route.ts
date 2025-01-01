"use server";

import { boardSequelize } from "@/app/(db)";
import Board from "@/app/(db)/board/board";
import Category from "@/app/(db)/board/category";
import Comment from "@/app/(db)/board/comment";
import Recommend from "@/app/(db)/board/recommend";
import User from "@/app/(db)/board/user";
import { encryptPWD } from "@/app/lib/encryptPWD";

export async function GET() {
  try {
    await boardSequelize.sync({ force: true });
    await Category.create({ title: "어떤탭", href: "what" });
    await Category.create({ title: "정보", href: "info" });
    await Category.create({ title: "질문", href: "question" });
    await Category.create({ title: "그냥있음", href: "just" });
    await Category.create({ title: "공지", href: "inform" });

    await User.create({
      nick: "운영자",
      strId: "dnsdudwk",
      pwd: encryptPWD("dnsdudwk", "소금"),
    });
    await User.create({
      nick: "펜잘중독자",
      strId: "vpswkf",
      pwd: encryptPWD("아무거나", "소금"),
    });

    await Board.create({
      categoryId: 1,
      writerId: 2,
      title: "보급품 정도는 원격으로 받을 수 있게 해다요",
      looks: 5,
    });
    await Board.create({
      categoryId: 1,
      writerId: 2,
      title: "보급품 정도는 원격으로 받을 수 있게 해다요22222",
      looks: 52,
    });
    await Board.create({
      categoryId: 2,
      writerId: 2,
      title: "아뇨 뚱인데요",
      looks: 512,
    });
    await Board.create({
      categoryId: 3,
      writerId: 2,
      title: "달빛 아래서 악마와 춤춰본 적 있나?",
      looks: 777,
    });

    await Comment.create({ boardId: 1, writerId: 1, content: "test" });
    await Comment.create({ boardId: 1, writerId: 1, content: "test2" });
    await Comment.create({ boardId: 1, writerId: 1, content: "test3" });
    await Comment.create({ boardId: 1, writerId: 1, content: "test4" });
    await Comment.create({ boardId: 1, writerId: 1, content: "test5" });

    await Recommend.create({ boardId: 2, writerId: 1 });
    await Recommend.create({ boardId: 3, writerId: 1 });
    await Recommend.create({ boardId: 2, writerId: 1 });

    return Response.json({ response: "생성완료" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ response: "생성실패" }, { status: 500 });
  }
}
