export const mkHref = (addr: string, obj: Object) => {
  let href = addr;

  const arr: Array<[string, string | undefined | null | number]> =
    Object.entries(obj);
  const totalCnt = arr.filter((value) => {
    return value[1] !== null && value[1] !== undefined;
  }).length;

  if (totalCnt !== 0) {
    let cnt = 1;
    href = addr + "?";
    arr.forEach((target) => {
      if (target[1] === null || target[1] === undefined) return;
      href = href + `${target[0]}=${target[1]}`;
      if (!(cnt++ === totalCnt)) href = href + "&";
      return;
    });
  }
  return href;
};
