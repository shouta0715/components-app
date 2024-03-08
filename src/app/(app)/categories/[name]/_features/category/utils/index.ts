export const getCountLabel = (count: number) => {
  return count < 1000 ? count : `${Math.floor(count / 1000)}k`;
};
