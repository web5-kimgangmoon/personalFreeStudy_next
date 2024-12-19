import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../layout";

export const getTodo = () => {
  return useQuery({
    queryKey: ["todo", "get"],
    queryFn: () => {
      return axios("/api/todoList", { method: "get" }).then((data) => {
        return data.data;
      });
    },
  });
};
export const postTodo = () => {
  return useMutation({
    mutationKey: ["todo", "post"],
    mutationFn: async (target: { content: string }) => {
      return (
        await axios("/api/todoList", {
          method: "post",
          data: { content: target.content },
        })
      ).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todo", "get"],
        exact: true,
        refetchType: "active",
      });
    },
  });
};
export const patchTodo = () => {
  return useMutation({
    mutationKey: ["todo", "patch"],
    mutationFn: async (target: { id: number }) => {
      return (
        await axios("/api/todoList", {
          method: "patch",
          data: { id: target.id },
        })
      ).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todo", "get"],
        exact: true,
        refetchType: "active",
      });
    },
  });
};
export const deleteTodo = () => {
  return useMutation({
    mutationKey: ["todo", "delete"],
    mutationFn: async (target: { id: number }) => {
      return (
        await axios("/api/todoList", {
          method: "delete",
          data: { id: target.id },
        })
      ).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todo", "get"],
        exact: true,
        refetchType: "active",
      });
    },
  });
};
