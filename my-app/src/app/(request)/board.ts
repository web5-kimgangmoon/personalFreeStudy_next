import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../layout";

export const getCategory = () => {
  return useQuery({
    queryKey: ["category", "get"],
    queryFn: () => {
      return axios("/api/board/category", { method: "get" }).then((data) => {
        return data.data;
      });
    },
  });
};

export const getBoardList = (
  category: string | null,
  page: number,
  board_limit: number
) => {
  return useQuery({
    queryKey: ["board", "list", "get", category, page],
    queryFn: () => {
      return axios("/api/board/board", {
        method: "get",
        params: { category, page, board_limit },
      }).then((data) => {
        return data.data;
      });
    },
  });
};
