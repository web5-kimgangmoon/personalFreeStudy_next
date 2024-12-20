import { ArcaLogo } from "@/app/public/arcaLogo";
import { UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { ReturnRoot } from "../../public/returnRoot";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { TouchEvent, useCallback, useId, useMemo, useState } from "react";
import clsx from "clsx";
import { usePathname, useSearchParams } from "next/navigation";

export const Board_main = () => {
  const rootId = useId();
  return (
    <div className="relative" id={rootId}>
      <Header />
      <Body />
      <Footer />
      <ConvenienceIcons rootId={rootId} />
    </div>
  );
};

const Header = () => {
  return (
    <header className="flex h-20 bg-header justify-between p-5">
      <Link href={"/board"}>
        <ArcaLogo className="text-white w-full h-full" />
      </Link>
      <Link href={"/board/login"}>
        <UserIcon className="w-full h-full text-white" />
      </Link>
    </header>
  );
};

const Body = () => {
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
      // e.currentTarget.style.left = `${x}px`;
    },
    [moved, moveStart]
  );
  const touchEnd = useCallback((e: TouchEvent<HTMLUListElement>) => {
    setMoved(
      Number(
        e.currentTarget.style.transform.split("translate(")[1].split("px")[0]
        // e.currentTarget.style.left.split("px")[0]
      )
    );
  }, []);
  return (
    <section className="container min-h-screen">
      <div className="py-4">
        <div className="h-12 relative overflow-hidden">
          <ul
            className="absolute top-0 left-0 flex border-b border-board_gray px-4 gap-4"
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
    </section>
  );
};

const Tap = ({ href, children }: { href: string; children: string }) => {
  const current = usePathname();
  const category = useSearchParams().get("category");
  return (
    <Link
      href={href === "" ? "/board" : current + `?category=${href}`}
      className={clsx(
        "px-2 py-1 text-nowrap",
        ((!category && href === "") || category == href) &&
          "border border-board_gray border-b-0 relative before:index-2 before:absolute before:bottom-[-1px] before:left-0 before:w-full before:h-[1px] before:bg-white"
      )}
    >
      {children}
    </Link>
  );
};

const Footer = () => {
  return (
    <footer className="bg-footer h-30 p-5">
      <div className="flex text-blue-700">김강문 개인학습(클론코딩)</div>
      <div className="flex justify-flex-start">
        <ReturnRoot>루트 페이지로 돌아가기</ReturnRoot>
      </div>
    </footer>
  );
};

const ConvenienceIcons = ({ rootId }: { rootId: string }) => {
  const act_up = useCallback(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, []);
  const act_down = useCallback(() => {
    window.scrollTo({
      behavior: "smooth",
      top: document.getElementById(rootId)?.offsetHeight,
    });
  }, []);
  return (
    <div className="fixed bottom-0 right-0 flex gap-2">
      <button
        className="w-10 h-10 p-3 bg-convenienceIcon rounded-full"
        onClick={act_up}
      >
        <ArrowUpIcon strokeWidth={5} className="text-white" />
      </button>
      <button
        className="w-10 h-10 p-3 bg-convenienceIcon rounded-full"
        onClick={act_down}
      >
        <ArrowDownIcon strokeWidth={5} className="text-white" />
      </button>
    </div>
  );
};
