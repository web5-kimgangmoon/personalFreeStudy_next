import Link from "next/link";
import { TouchEvent, useCallback, useState } from "react";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { mkCreatedAtStr } from "@/app/lib/mkCreatedAtStr";

export const Body = () => {
  return (
    <section className="container min-h-screen">
      <CategoryList />
      <BoardList />
    </section>
  );
};

const CategoryList = () => {
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
          <Tap href="">전체</Tap>
          <Tap href="what">어떤탭</Tap>
          <Tap href="info">정보</Tap>
          <Tap href="question">질문</Tap>
          <Tap href="just">그냥있음</Tap>
        </ul>
      </div>
    </div>
  );
};

const Tap = ({ href, children }: { href: string; children: string }) => {
  const params = useSearchParams();
  const boardId = params.get("boardId");
  const category = params.get("category");
  return (
    <Link
      href={
        href === ""
          ? "/board" + (boardId ? `?boardId=${boardId}` : "")
          : `/board?category=${href}` + (boardId ? `&boardId=${boardId}` : "")
      }
      className={clsx(
        "px-2 py-1 text-nowrap",
        ((!category && href === "") || category == href) &&
          "font-bold border border-board_gray border-b-0 relative before:absolute before:bottom-[-2px] before:left-0 before:w-full before:h-[3px] before:bg-white"
      )}
    >
      {children}
    </Link>
  );
};

const BoardList = () => {
  return (
    <ul>
      <BoardItem
        id={1}
        createdAt={Date.now()}
        categoryBox="정보"
        content="보급품 정도는 원격으로 받을 수 있게 해다요"
        cmtCnt={5}
        writer="펜잘중독자"
        looks={5}
        recommendCnt={0}
      />
      <BoardItem
        id={2}
        createdAt={Date.now() - 3600000}
        content="보급품 정도는 원격으로 받을 수 있게 해다요"
        cmtCnt={0}
        writer="펜잘중독자"
        looks={5}
        recommendCnt={0}
      />
      <BoardItem
        id={3}
        createdAt={20}
        categoryBox="정보"
        content="보급품 정도는 원격으로 받을 수 있게 해다요"
        cmtCnt={5}
        writer="펜잘중독자"
        looks={5}
        recommendCnt={0}
      />
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
  createdAt: number;
  looks: number;
  recommendCnt: number;
}) => {
  const params = useSearchParams();
  const boardId = params.get("boardId");
  const category = params.get("category");
  return (
    <li>
      <Link
        className={clsx(
          "border-b border-board_gray py-1 px-2 flex flex-col gap-1",
          Number(boardId) === id && "bg-selected"
        )}
        href={
          category
            ? `/board?category=${category}&boardId=${id}`
            : `/board?boardId=${id}`
        }
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
              {mkCreatedAtStr(createdAt)}
            </div>
            <div className="px-2 border-r-2 border-inactive">조회 {looks}</div>
            <div className="px-2">추천 {recommendCnt}</div>
          </div>
        </div>
      </Link>
    </li>
  );
};
