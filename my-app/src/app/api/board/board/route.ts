"use server";

import { boardSequelize } from "@/app/(db)";
import Board from "@/app/(db)/board/board";
import Category from "@/app/(db)/board/category";
import Comment from "@/app/(db)/board/comment";
import Recommend from "@/app/(db)/board/recommend";
import User from "@/app/(db)/board/user";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function HEAD(request: Request) {
  await boardSequelize.sync({ force: true });
}

// export async function OPTIONS() {
//   try {
//   } catch (error) {}
//   await boardSequelize.sync({ force: true });
//   return NextResponse.next({headers:{""}})
// }

export async function GET(request: NextRequest) {
  // data: request.nextUrl.searchParams.get("target"),

  let category = request.nextUrl.searchParams.get("category");
  let page: string | null = request.nextUrl.searchParams.get("page");
  let board_limit: string | null =
    request.nextUrl.searchParams.get("board_limit");

  const strCheck = z.string();
  const plusIntCheck = z.number().int().positive();

  const chkCategoryResult = strCheck.safeParse(category);
  const chkPageResult = plusIntCheck.safeParse(page === null ? "1" : +page);
  const chkBoard_limit = plusIntCheck.safeParse(
    board_limit === null ? "10" : +board_limit
  );

  if (!chkCategoryResult.success) category = null;
  if (!chkPageResult.success) page = null;
  if (!chkBoard_limit.success) board_limit = null;

  const boardList = await Board.findAll({
    include: [
      {
        model: Category,
        as: "category",
        where: category === null ? undefined : { title: category },
      },
      {
        model: Recommend,
        as: "recommend",
      },
      {
        model: User,
        as: "writer",
        attributes: ["nick"],
      },
      {
        model: Comment,
        as: "comment",
      },
    ],
    offset:
      board_limit === null || page === null
        ? undefined
        : (+page - 1) * +board_limit,
    limit:
      board_limit === null || page === null ? undefined : +page * +board_limit,
  });

  return Response.json(
    {
      boards: boardList.map((target) => ({
        id: target.get("id"),
        title: target.get("title"),
        nick: target.get("writer").get("nick"),
        createdAt: target.get("createdAt"),
        looks: target.get("looks"),
        cmtCnt: target.get("comment").length,
        recommend:
          target.get("recommend").length -
          target.get("recommend").filter((item) => !item.get("isRecommend"))
            .length,
      })),
      boardCnt: await Board.count(),
    },
    { status: 200 }
  );
}
