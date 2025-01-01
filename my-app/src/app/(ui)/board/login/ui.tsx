import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useId } from "react";

export const LoginContainer = () => {};

export const LoginUIDummy = () => {
  const pwdId = useId();
  return (
    <div className="min-h-screen bg-login_bg flex items-center px-2">
      <section className="container h-max bg-white flex flex-col gap-5 px-4 py-8 rounded-md rounded-tl-3xl shadow-lg">
        <div className="flex justify-center py-10">
          <strong className="inline-block text-3xl">게시판 로그인</strong>
        </div>
        <div className="flex justify-center py-8">
          <button className="flex px-3 py-2 bg-login_btnBg text-login_btnText text-sm rounded-xl justify-center items-center gap-2">
            <ArrowLeftIcon width={16} className="text-login_arrowGray" />
            ansrn231
          </button>
        </div>
        <div>
          <div>
            <div className="text-login_gray relative h-[69px] overflow-hidden flex items-end py-2">
              <label htmlFor={pwdId}>비밀번호</label>
              <Image
                className="absolute top-0 right-6"
                src={"/karisuma_light.svg"}
                width={90}
                height={99}
                alt="없음"
              />
            </div>
            <div>
              <input
                id={pwdId}
                className="w-full border border-login_gray focus:border-login_blueBtn rounded-sm outline-none p-1 transition-colors"
              />
            </div>
          </div>
          <div className="py-5">
            <button className="flex justify-center w-full py-2 bg-login_blueBtn text-white rounded-md">
              다음
            </button>
          </div>
          <div className="flex justify-center">
            <Link href={"/board/regist"} className="text-login_blueBtn text-sm">
              계정 만들기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export const LoginUI = () => {
  return (
    <div className="min-h-screen bg-login_bg flex items-center px-2">
      <section className="relative container overflow-hidden rounded-md rounded-tl-3xl shadow-lg">
        <LoginCenterUI isBlank={true} />
        <LoginCenterUI />
      </section>
    </div>
  );
};

export const LoginCenterUI = ({
  isBlank,
  isNext,
}: {
  isBlank?: boolean;
  isNext?: boolean;
}) => {
  const inputId = useId();
  return (
    <section
      className={clsx(
        "h-max bg-white flex flex-col gap-5 px-4 py-8",
        isBlank || "top-0 left-0 absolute w-full h-full"
      )}
    >
      <div className="flex justify-center py-10">
        <strong
          className={clsx(
            "inline-block text-3xl",
            isBlank && "opacity-0 cursor-default select-none"
          )}
        >
          게시판 로그인
        </strong>
      </div>
      <div className="flex justify-center py-8">
        <button
          className={clsx(
            "flex px-3 py-2 bg-login_btnBg text-login_btnText text-sm rounded-xl justify-center items-center gap-2",
            (isBlank || !isNext) && "opacity-0 select-none"
          )}
          disabled={isBlank || !isNext}
        >
          <ArrowLeftIcon width={16} className="text-login_arrowGray" />
          ansrn231
        </button>
      </div>
      <div>
        <div className={clsx(isBlank && "opacity-0 select-none")}>
          <div className="text-login_gray relative h-[69px] overflow-hidden flex items-end py-2">
            <label htmlFor={inputId}>{isNext ? "비밀번호" : "아이디"}</label>
            <Image
              className={clsx("absolute top-0 right-6", isNext && "hidden")}
              src={"/karisuma_light.svg"}
              width={90}
              height={99}
              alt="없음"
            />
          </div>
          <div>
            <input
              id={inputId}
              className={clsx(
                "w-full border border-login_gray focus:border-login_blueBtn rounded-sm outline-none p-1 transition-colors",
                isBlank && "cursor-default"
              )}
              disabled={isBlank}
            />
          </div>
        </div>
        <div className={clsx("py-5", isBlank && "opacity-0")}>
          <button
            className={clsx(
              "flex justify-center w-full py-2 bg-login_blueBtn text-white rounded-md",
              isBlank && "cursor-default select-none"
            )}
          >
            {isNext ? "로그인" : "다음"}
          </button>
        </div>
        <div className={clsx("flex justify-center", isBlank && "opacity-0")}>
          <Link
            href={isBlank ? "" : "/board/regist"}
            className={clsx(
              "text-login_blueBtn text-sm",
              isBlank && "cursor-default select-none"
            )}
          >
            계정 만들기
          </Link>
        </div>
      </div>
    </section>
  );
};
