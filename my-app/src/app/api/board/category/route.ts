"use server";

import { boardSequelize } from "@/app/(db)";
import Category from "@/app/(db)/board/category";

export async function HEAD(request: Request) {
  await boardSequelize.sync({ force: true });
}

// export async function OPTIONS() {
//   try {
//   } catch (error) {}
//   await boardSequelize.sync({ force: true });
//   return new Response(null);
// }

export async function GET() {
  return Response.json(
    {
      categories: (await Category.findAll()).map((target) => ({
        title: target.get("title"),
      })),
    },
    { status: 200 }
  );
}
