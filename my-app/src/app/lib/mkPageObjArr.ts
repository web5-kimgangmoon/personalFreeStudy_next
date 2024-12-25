import { PageObj } from "../types/board";

export const mkPageObjArr = (
  cnt: number,
  limit: number,
  maxPage_even: number,
  currentPage: number = 1
) => {
  const pageSum = cnt < 1 ? 1 : Math.ceil(cnt / limit);

  if (currentPage < 1 || currentPage > pageSum) currentPage = 1;

  const result: PageObj[] = [];
  // 페이지 전체가 맥스 페이지보다 적은 경우
  if (pageSum < maxPage_even + 1) {
    for (let i = 1; i < pageSum + 1; i++) {
      result.push({
        page: i,
        // type: "page",
        itemStr: i,
        isSelected: currentPage === i,
        NoBorder:
          // currentPage + 1 === i
          //   ? "left"
          //   : currentPage - 1 === i
          //   ? "right"
          //   : undefined,
          currentPage - 1 === i ? true : false,
      });
    }
  }
  // PageSum이 maxPage보다 많은 경우, maxPage의 반보다 적은 경우에는 보여지는 페이지가 올라가지 않는다.
  // maxPage의 반보다는 적은 경우
  // maxPage의 반보다 많은 경우
  else {
    if (currentPage > maxPage_even / 2) {
      result.push({
        page: 1,
        // type: "icon",
        itemStr: "LBack",
        isSelected: false,
      });
      result.push({
        page: currentPage - 1,
        // type: "icon",
        itemStr: "back",
        isSelected: false,
      });
    }
    if (currentPage < maxPage_even / 2 + 1)
      for (let i = 1; i < maxPage_even + 1; i++) {
        result.push({
          page: i,
          // type: "page",
          itemStr: i,
          isSelected: currentPage === i,
          NoBorder:
            // currentPage + 1 === i
            //   ? "left"
            //   : currentPage - 1 === i
            //   ? "right"
            //   : undefined,
            currentPage - 1 === i ? true : false,
        });
      }
    if (
      currentPage > maxPage_even / 2 &&
      pageSum > currentPage + maxPage_even / 2 - 1
    )
      for (
        let i = currentPage - maxPage_even / 2 + 1;
        i < currentPage + maxPage_even / 2 + 1;
        i++
      ) {
        result.push({
          page: i,
          // type: "page",
          itemStr: i,
          isSelected: currentPage === i,
          NoBorder:
            // currentPage + 1 === i
            //   ? "left"
            //   : currentPage - 1 === i
            //   ? "right"
            //   : undefined,
            currentPage - 1 === i ? true : false,
        });
      }
    if (
      currentPage > maxPage_even / 2 &&
      pageSum < currentPage + maxPage_even / 2
    )
      for (let i = pageSum - maxPage_even + 1; i < pageSum + 1; i++) {
        result.push({
          page: i,
          // type: "page",
          itemStr: i,
          isSelected: currentPage === i,
          NoBorder:
            // currentPage + 1 === i
            //   ? "left"
            //   : currentPage - 1 === i
            //   ? "right"
            //   : undefined,
            currentPage - 1 === i ? true : false,
        });
      }
    if (
      // currentPage > maxPage_even + maxPage_even / 2 &&
      currentPage < pageSum - maxPage_even / 2 + 1 &&
      pageSum > maxPage_even
    ) {
      result.push({
        page: currentPage + 1,
        // type: "icon",
        itemStr: "front",
        isSelected: false,
      });
      result.push({
        page: pageSum,
        // type: "icon",
        itemStr: "LFront",
        isSelected: false,
      });
    }
  }
  return result;
};
