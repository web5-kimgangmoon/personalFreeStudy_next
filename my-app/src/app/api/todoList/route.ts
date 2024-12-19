"use server";

import sequelize from "@/app/(db)";
import Todo from "@/app/(db)/todo";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

// export async function OPTIONS() {
//   try {
//     await sequelize.sync();
//   } catch (error) {}
// }

export async function GET() {
  try {
    await sequelize.sync();
    return Todo["findAll"]().then((data) =>
      Response.json({ data }, { status: 200 })
    );
  } catch (error) {
    return Response.json({ error: error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const check = z
      .string({ message: "올바른 타입으로 부탁합니다." })
      .max(60, "한글기준, 20자 이하로 작성부탁드립니다.")
      .min(1, "빈 todoList는 작성할 수 없습니다.");
    const result = check.safeParse(data.content);

    if (!result.success) throw Error(result.error.errors[0].message);
    if (await Todo.findOne({ where: [{ content: data.content }] }))
      throw Error("이미 존재하는 todo입니다");

    return (await Todo.create({ content: data.content }))
      ? Response.json({ data: "작성완료" }, { status: 201 })
      : Response.json({ data: "작성실패" }, { status: 500 });
  } catch (error: any) {
    return Response.json(
      {
        error: error.message,
      },
      { status: 400 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const data = await request.json();
    const idCheck = z
      .number({ message: "잘못된 타입입니다." })
      .int({ message: "정수가 아닙니다." })
      .positive({ message: "자연수가 아닙니다." });
    const idResult = idCheck.safeParse(data.id);

    if (!idResult.success) throw Error(idResult.error.errors[0].message);

    const target = await Todo.findOne({ where: { id: data.id } });
    if (!target) throw Error("존재하지 않는 todo입니다.");

    return (await target.update(
      { isCompleted: !target.get("isCompleted") },
      { where: { id: data.id } }
    ))
      ? Response.json({ data: "요청성공" }, { status: 200 })
      : Response.json({ error: "요청실패" }, { status: 500 });
  } catch (error: any) {
    return Response.json(
      {
        error: error.message,
      },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const data = await request.json();
    const idCheck = z
      .number({ message: "잘못된 타입입니다." })
      .int({ message: "정수가 아닙니다." })
      .positive({ message: "자연수가 아닙니다." });
    const idResult = idCheck.safeParse(data.id);

    if (!idResult.success) throw Error(idResult.error.errors[0].message);

    const target = await Todo.findOne({ where: { id: data.id } });
    if (!target) throw Error("존재하지 않는 todo입니다.");
    await target.destroy();
    return Response.json({ data: "요청성공" }, { status: 200 });
  } catch (error: any) {
    return Response.json(
      {
        error: error.message,
      },
      { status: 400 }
    );
  }
}
