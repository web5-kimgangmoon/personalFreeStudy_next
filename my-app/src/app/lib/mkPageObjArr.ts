export const mkPageObjArr = (
  cnt: number,
  limit: number,
  maxPage_even: number,
  currentPage: number = 1
) => {
  type PageObj = {
    page: number;
    type: "icon" | "page";
    input: number | "LBack" | "back" | "LFront" | "front";
    isSelected: boolean;
  };

  const pageSum = cnt < 1 ? 1 : Math.ceil(cnt / limit);

  if (currentPage < 1 || currentPage > maxPage_even || currentPage > pageSum)
    currentPage = 1;

  // 페이지 전체가 맥스 페이지보다 적은 경우
  if (pageSum < maxPage_even + 1) {
    const result: PageObj[] = [];
    for (let i = 1; i < pageSum + 1; i++) {
      result.push({
        page: i,
        type: "page",
        input: i,
        isSelected: currentPage === i,
      });
    }
    return result;
  }
  // PageSum이 maxPage보다 많은 경우, maxPage의 반보다 적은 경우에는 보여지는 페이지가 올라가지 않는다.
  // maxPage의 반보다는 적은 경우
  // maxPage의 반보다 많은 경우
  if (pageSum > maxPage_even) {
    const result: PageObj[] = [];
    if (currentPage > maxPage_even + maxPage_even / 2) {
      result.push({ page: 1, type: "icon", input: "LBack", isSelected: false });
      result.push({
        page: currentPage - 1,
        type: "icon",
        input: "back",
        isSelected: false,
      });
    }
    if (currentPage < maxPage_even / 2 + 1)
      for (let i = 1; i < maxPage_even + 1; i++) {
        result.push({
          page: i,
          type: "page",
          input: i,
          isSelected: currentPage === i,
        });
      }
    if (
      currentPage > maxPage_even / 2 &&
      pageSum > currentPage + maxPage_even / 2 - 1
    )
      for (
        let i = currentPage - maxPage_even / 2 + 1;
        i < currentPage + maxPage_even / 2;
        i++
      ) {
        result.push({
          page: i,
          type: "page",
          input: i,
          isSelected: currentPage === i,
        });
      }
    if (
      currentPage > maxPage_even / 2 &&
      pageSum < currentPage + maxPage_even / 2
    )
      for (let i = pageSum - maxPage_even + 1; i < pageSum + 1; i++) {
        result.push({
          page: i,
          type: "page",
          input: i,
          isSelected: currentPage === i,
        });
      }
    if (
      currentPage > maxPage_even + maxPage_even / 2 &&
      currentPage < pageSum - maxPage_even / 2 + 1
    ) {
      result.push({
        page: currentPage + 1,
        type: "icon",
        input: "front",
        isSelected: false,
      });
      result.push({
        page: pageSum,
        type: "icon",
        input: "LFront",
        isSelected: false,
      });
    }
    return result;
  }
};
