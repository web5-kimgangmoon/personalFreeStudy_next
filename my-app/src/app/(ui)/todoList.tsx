import clsx from "clsx";
import { TodoItem, TodoList as TodoListTy } from "../types/todoList";
import {
  ChangeEvent,
  KeyboardEvent,
  KeyboardEventHandler,
  useCallback,
  useId,
  useState,
} from "react";
import z from "zod";
import Link from "next/link";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { ReturnRoot } from "./public/returnRoot";

const TodoList = ({
  todoList,
  deleteItem,
  completeItem,
  addItem,
}: {
  todoList: TodoListTy;
  deleteItem: (item: TodoItem) => void;
  completeItem: (item: TodoItem) => void;
  addItem: (Item: { content: string }) => void;
}) => {
  return (
    <section className="container">
      <div className="flex py-10 justify-center">
        <table className="table-fixed w-[50rem] border-collapse">
          <HeaderRow borderColor="border-black" />
          <tbody>
            {todoList.map((item, idx) => {
              return (
                <Row
                  {...item}
                  key={item.id}
                  deleteTodo={() => {
                    deleteItem(item);
                  }}
                  completeTodo={() => {
                    completeItem(item);
                  }}
                  borderColor={clsx(
                    idx % 3 === 0 && "border-blue-700",
                    idx % 3 === 1 && "border-red-700",
                    idx % 3 === 2 && "border-green-700"
                  )}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <InputBox addItem={addItem} />
      <ReturnRoot>되돌아가기</ReturnRoot>
    </section>
  );
};

const HeaderRow = ({ borderColor }: { borderColor?: string }) => {
  return (
    <thead className="text-lg">
      <tr>
        <th className={`border border-2 p-2 ${borderColor}`}>완료여부</th>
        <th colSpan={5} className={`border border-2 p-2 ${borderColor}`}>
          제목
        </th>
        <th className={`border border-2 p-2 ${borderColor}`}>진행상황</th>
        <th className={`border border-2 p-2 ${borderColor}`}>삭제버튼</th>
      </tr>
    </thead>
  );
};

const Row = ({
  isCompleted,
  content,
  deleteTodo,
  completeTodo,
  borderColor,
}: {
  isCompleted: boolean;
  content: string;
  deleteTodo: () => void;
  completeTodo: () => void;
  borderColor?: string;
}) => {
  return (
    <tr>
      <td className={`border border-2 ${borderColor}`}>
        <div
          className={clsx(
            `flex justify-center`,
            !isCompleted && "text-blue-300"
          )}
        >
          <svg className="w-10 h-10">
            {isCompleted ? (
              <polyline
                points="10,20 20,30 30,10"
                fill="none"
                stroke="rgb(21, 128, 61)"
                strokeWidth={4}
              />
            ) : (
              <>
                <polyline
                  points="10,10 30,30"
                  fill="none"
                  stroke="rgb(29 78 216)"
                  strokeWidth={4}
                />
                <polyline
                  points="30,10 10,30"
                  fill="none"
                  stroke="rgb(29 78 216)"
                  strokeWidth={4}
                />
              </>
            )}
          </svg>
        </div>
      </td>
      <td className={`border border-2 px-2 ${borderColor}`} colSpan={5}>
        {content}
      </td>
      <td className={`border border-2 ${borderColor}`}>
        <TodoBtn
          className={clsx(
            `${
              isCompleted
                ? "border-green-300 bg-green-200 text-green-700"
                : "border-blue-300 bg-blue-200 text-blue-700"
            }`
          )}
          name={isCompleted ? "완료" : "진행중"}
          onClick={completeTodo}
        />
      </td>
      <td className={`border border-2 ${borderColor}`}>
        <TodoBtn
          onClick={deleteTodo}
          className="border-red-300 bg-red-200 text-red-700"
          name="삭제"
        />
      </td>
    </tr>
  );
};

const TodoBtn = ({
  className,
  name,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
  name: string;
}) => {
  return (
    <div className="flex justify-center p-2">
      <Btn className={className} name={name} onClick={onClick} />
    </div>
  );
};

const Btn = ({
  className,
  onClick,
  name,
}: {
  className?: string;
  onClick?: () => void;
  name: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(`border-2 rounded-md px-2 py-1 font-bold ${className}`)}
    >
      {name}
    </button>
  );
};

const InputBox = ({
  addItem,
}: {
  addItem: (target: { content: string }) => void;
}) => {
  const check = z
    .string({ message: "빈 todoList는 작성할 수 없습니다." })
    .max(60, "한글기준, 20자 이하로 작성부탁드립니다.")
    .min(1, "빈 todoList는 작성할 수 없습니다.");

  const inputId = useId();
  const [content, setContent] = useState("");
  const [warning, setWarning] = useState(
    "이곳에서 todoList를 추가할 수 있습니다. (20자 제한)"
  );

  const typing = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.currentTarget.value);
  }, []);

  const onSend = useCallback(async (content: string) => {
    const typeCheck = check.safeParse(content);

    if (typeCheck.success) {
      await addItem({ content });
      setContent("");
      setWarning("이곳에서 todoList를 추가할 수 있습니다. (20자 제한)");
    } else setWarning(typeCheck.error.errors[0].message);
  }, []);

  const onEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") onSend(content);
    },
    [content]
  );
  return (
    <div className="flex items-center px-5 flex-col gap-2">
      <label className={clsx("text-sm")} htmlFor={inputId}>
        {warning}
      </label>
      <input
        id={inputId}
        type={"text"}
        className="outline-none border border-2 border-blue-700 rounded-xl px-2 py-3 w-[36rem] focus:border-green-700"
        onChange={typing}
        placeholder="할 일을 작성해주세요."
        value={content}
        onKeyDown={onEnter}
      />
      <Btn
        name="작성완료"
        className="bg-blue-200 border-blue-300 text-blue-700 focus:bg-green-200 focus:border-green-300 focus:text-green-700"
        onClick={() => onSend(content)}
      />
    </div>
  );
};

export default TodoList;
