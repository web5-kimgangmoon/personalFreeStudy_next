import { useCallback } from "react";
import { ReturnRoot } from "../../public/returnRoot";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";

export const Footer = () => {
  return (
    <footer className="bg-footer h-30 p-5">
      <div className="flex text-blue-700">김강문 개인학습(클론코딩)</div>
      <div className="flex justify-flex-start">
        <ReturnRoot>루트 페이지로 돌아가기</ReturnRoot>
      </div>
    </footer>
  );
};

export const ConvenienceIcons = ({ rootId }: { rootId: string }) => {
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
