import Link from "next/link";
import { TouchEvent, useCallback, useState } from "react";
import clsx from "clsx";
import { usePathname, useSearchParams } from "next/navigation";
import { mkCreatedAtStr } from "@/app/lib/mkCreatedAtStr";
import { PageObj } from "@/app/types/board";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { mkPageObjArr } from "@/app/lib/mkPageObjArr";
import { Params } from "@/app/types/board";
import { mkHref } from "@/app/lib/mkHref";

export const Body = ({
  categories,
  boards,
  boardCnt,
}: {
  categories: { href: string; title: string }[];
  boards: {
    id: number;
    createdAt: Date;
    title: string;
    cmtCnt: number;
    nick: string;
    looks: number;
    recommend: number;
    categoryHref: string;
    categoryTitle: string;
  }[];
  boardCnt: number;
}) => {
  return (
    <section className="container min-h-screen">
      <CategoryList categories={categories} />
      <BoardList boards={boards} />
      <PageList cnt={boardCnt} limit={10} maxPage_even={6} />
    </section>
  );
};

const CategoryList = ({
  categories,
}: {
  categories: { href: string; title: string }[];
}) => {
  const [moved, setMoved] = useState(0);
  const [moveStart, setMoveStart] = useState(0);
  const touchStart = useCallback((e: TouchEvent<HTMLUListElement>) => {
    setMoveStart(Math.floor(e.targetTouches.item(0).clientX));
  }, []);

  const touchMove = useCallback(
    (e: TouchEvent<HTMLUListElement>) => {
      const x = moved - Math.floor(moveStart - e.targetTouches.item(0).clientX);
      if (x < 0 && x > window.innerWidth - e.currentTarget.clientWidth)
        e.currentTarget.style.transform = `translate(${x}px, 0px)`;
    },
    [moved, moveStart]
  );
  const touchEnd = useCallback((e: TouchEvent<HTMLUListElement>) => {
    const moveStyle = e.currentTarget.style.transform
      ?.split("translate(")[1]
      ?.split("px")[0];
    setMoved(Number(moveStyle ? moveStyle : 0));
  }, []);
  return (
    <div className="py-4">
      <div className="h-12 relative overflow-hidden">
        <ul
          className="absolute top-0 left-0 flex border-b border-board_gray px-4 gap-4 min-w-full"
          onTouchStart={touchStart}
          onTouchMove={touchMove}
          onTouchEnd={touchEnd}
        >
          <Tap href={""}>전체</Tap>
          {categories.map((target) => (
            <Tap href={target.href} key={target.href}>
              {target.title}
            </Tap>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Tap = ({ href, children }: { href: string; children: string }) => {
  const addr = usePathname();

  const params = useSearchParams();
  const boardId = params.get("boardId");
  const category = params.get("category");
  const page = params.get("page");

  const hrefObj: Params = { category: href, boardId, page };
  return (
    <Link
      href={mkHref(addr, hrefObj)}
      className={clsx(
        "px-2 py-1 text-nowrap",
        ((!category && href === "") || category === href) &&
          "font-bold border border-board_gray border-b-0 relative before:absolute before:bottom-[-2px] before:left-0 before:w-full before:h-[3px] before:bg-white"
      )}
    >
      {children}
    </Link>
  );
};

const BoardList = ({
  boards,
}: {
  boards: {
    id: number;
    createdAt: Date;
    title: string;
    cmtCnt: number;
    nick: string;
    looks: number;
    recommend: number;
    categoryHref: string;
    categoryTitle: string;
  }[];
}) => {
  return (
    <ul>
      {boards.map((target) => (
        <BoardItem
          id={target.id}
          key={target.id}
          createdAt={target.createdAt}
          categoryBox={
            target.categoryHref === "inform" ? "" : target.categoryTitle
          }
          content={target.title}
          cmtCnt={target.cmtCnt}
          writer={target.nick}
          looks={target.looks}
          recommendCnt={target.recommend}
        ></BoardItem>
      ))}
    </ul>
  );
};

const BoardItem = ({
  id,
  categoryBox,
  content,
  cmtCnt,
  writer,
  createdAt,
  looks,
  recommendCnt,
}: {
  id: number;
  content: string;
  categoryBox?: string;
  cmtCnt: number;
  writer: string;
  createdAt: Date;
  looks: number;
  recommendCnt: number;
}) => {
  const addr = usePathname();
  const params = useSearchParams();

  const boardId = params.get("boardId");
  const category = params.get("category");
  const page = params.get("page");

  const hrefObj: Params = { category, boardId: id, page };

  return (
    <li>
      <Link
        className={clsx(
          "border-b border-board_gray py-1 px-2 flex flex-col gap-1",
          Number(boardId) === id && "bg-selected"
        )}
        href={mkHref(addr, hrefObj)}
      >
        <div className="flex items-center">
          <div className={clsx("py-1 pr-2", !categoryBox && "hidden")}>
            <div className="py-1 px-2 bg-cateBox text-sm text-white font-bold rounded-sm text-nowrap">
              {categoryBox}
            </div>
          </div>
          <div className="flex gap-1 w-full phone:max-w-60">
            <div className="word-nowrap truncate">{content}</div>
            <div
              className={clsx("text-sm", cmtCnt === 0 && "hidden")}
            >{`[${cmtCnt}]`}</div>
          </div>
        </div>
        <div className="flex justify-between text-sm text-inactive">
          <div className="font-bold">{writer}</div>
          <div className="flex">
            <div className="px-2 border-r-2 border-inactive">
              {mkCreatedAtStr(new Date(createdAt).getTime())}
            </div>
            <div className="px-2 border-r-2 border-inactive">조회 {looks}</div>
            <div className="px-2">추천 {recommendCnt}</div>
          </div>
        </div>
      </Link>
    </li>
  );
};

const PageList = ({
  limit,
  cnt,
  maxPage_even,
}: {
  limit: number;
  cnt: number;
  maxPage_even: number;
}) => {
  const addr = usePathname();
  const params = useSearchParams();
  const category = params.get("category");
  const page: string | null | number = params.get("page");

  let boardId: string | null | number = params.get("boardId");
  boardId = boardId ? +boardId : null;

  const arr = mkPageObjArr(cnt, limit, maxPage_even, page ? +page : 1);
  return (
    <ol className="py-2 flex justify-center">
      {arr.map((target, idx) => (
        <PageItem
          {...target}
          isFirst={idx === 0 ? true : false}
          key={target.itemStr}
          addr={addr}
          boardId={boardId}
          category={category}
        />
      ))}
    </ol>
  );
};

const PageItem = ({
  isSelected,
  // type,
  NoBorder,
  itemStr,
  isFirst,
  addr,
  boardId,
  category,
  page,
}: PageObj & {
  isFirst?: boolean;
  addr: string;
  boardId: number | null;
  category: string | null;
  page: number;
}) => {
  console.log(addr);
  const hrefObj: Params = { category, boardId, page };

  return (
    <li>
      <Link
        href={mkHref(addr, hrefObj)}
        className={clsx(
          "flex justify-center items-center py-1 w-8 h-8 border",
          isSelected
            ? "border-selected_border bg-selected"
            : "border-boardGray",
          !isFirst && !isSelected && "border-l-0",
          // NoBorder === "right" && "border-r-0"
          NoBorder === true && "border-r-0"
        )}
      >
        {!Number.isNaN(Number(itemStr)) ? (
          itemStr
        ) : (
          <PageArrow itemStr={itemStr} />
        )}
      </Link>
    </li>
  );
};

const PageArrow = ({
  itemStr,
}: {
  itemStr: "LBack" | "back" | "front" | "LFront" | number;
}) => {
  return (
    <>
      {itemStr === "back" && <ArrowLeftIcon className="w-full h-full p-1" />}
      {itemStr === "front" && <ArrowRightIcon className="w-full h-full p-1" />}
      {itemStr === "LBack" && (
        <div className="flex px-1">
          <ArrowLeftIcon className="w-full h-full" />
          <ArrowLeftIcon className="w-full h-full" />
        </div>
      )}
      {itemStr === "LFront" && (
        <div className="flex px-1">
          <ArrowRightIcon className="w-full h-full" />
          <ArrowRightIcon className="w-full h-full" />
        </div>
      )}
    </>
  );
};
