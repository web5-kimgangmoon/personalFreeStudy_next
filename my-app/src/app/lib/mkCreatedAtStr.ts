export const mkCreatedAtStr = (createdAt: number) => {
  const gap = Date.now() - createdAt;

  if (gap < 3600000) return `${Math.floor(gap / 60000)}분 전`;
  if (gap < 3600000 * 24) return `${Math.floor(gap / 3600000)}시간 전`;
  if (gap < 3600000 * 24 * 7) return `${gap / 3600000 / 24}일 전`;

  const createdAtDate = new Date(createdAt);
  if (gap < 3600000 * 24 * 365)
    return `${String(createdAtDate.getMonth() + 1).padStart(
      2,
      "0"
    )}-${createdAtDate.getDate()}`;
  else
    return `${createdAtDate.getFullYear()}-${String(
      createdAtDate.getMonth() + 1
    ).padStart(2, "0")}-${String(createdAtDate.getDate()).padStart(2, "0")}`;
};
