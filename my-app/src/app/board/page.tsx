"use client";

import { useId } from "react";
import { Header } from "../(ui)/board/public/header";
import { Body } from "../(ui)/board/main/body";
import { ConvenienceIcons, Footer } from "../(ui)/board/public/footer";
import { getBoardList, getCategory } from "../(request)/board";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const rootId = useId();
  const params = useSearchParams();

  const categoryHref = params.get("category");
  const page = params.get("page");

  const category = getCategory();
  const boardList = getBoardList(categoryHref, page ? +page : 1, 10);

  return (
    <div className="relative" id={rootId}>
      <Header />
      <Body
        categories={category?.data?.categories ? category.data.categories : []}
        boards={boardList?.data?.boards ? boardList.data.boards : []}
        boardCnt={boardList?.data?.boardCnt ? boardList.data.boardCnt : 0}
      />
      <Footer />
      <ConvenienceIcons rootId={rootId} />
    </div>
  );
};

export default Page;
