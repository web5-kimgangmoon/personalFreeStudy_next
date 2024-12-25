export type PageObj = {
  page: number;
  //   type: "icon" | "page";
  itemStr: number | "LBack" | "back" | "LFront" | "front";
  isSelected?: boolean;
  // NoBorder?: "right" | "left";
  NoBorder?: boolean;
};

export type Params = {
  page: null | string | number;
  category: null | string;
  boardId: null | string | number;
};
