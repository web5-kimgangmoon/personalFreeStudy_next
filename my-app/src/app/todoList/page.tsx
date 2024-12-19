"use client";

import TodoList from "@/app/ui/todoList";
import { TodoItem } from "../types/todoList";
import {
  deleteTodo,
  getTodo,
  patchTodo,
  postTodo,
} from "../(request)/todoList";
import useAsyncSubscribe from "../hooks/useAsyncSubscribe";

const Page = () => {
  const { data, refetch } = getTodo();
  const pushTodo = postTodo();
  const completeTodo = patchTodo();
  const popTodo = deleteTodo();

  async function update(this: TodoItem, ev: string, target?: TodoItem) {
    switch (ev) {
      case "complete": {
        if (target) {
          if (this.id === target.id) {
            await completeTodo.mutate(target);
            return true;
          }
        }
      }
      default:
        return false;
    }
  }

  const observable = useAsyncSubscribe(
    data?.data ? data.data : [],
    refetch,
    pushTodo.mutate,
    popTodo.mutate,
    update
  );

  return (
    <TodoList
      todoList={data?.data ? data.data : []}
      deleteItem={observable.removeObserver}
      completeItem={(item: TodoItem) =>
        observable.notifyObservers({ ev: "complete", target: item })
      }
      addItem={observable.addObserver}
    />
  );
};

export default Page;
