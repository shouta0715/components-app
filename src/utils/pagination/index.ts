import { redirect } from "next/navigation";

export const getSkipPage = (
  current: string | number | undefined,
  take: number = 20
) => {
  if (!current) return 0;

  return (+current || 1) * take - take;
};

type CheckOverPage = {
  total: number;
  current: string | number;
  take?: number;
  pathname: string;
};
export const checkOverPage = ({
  total,
  current,
  take = 20,
  pathname,
}: CheckOverPage) => {
  const isOver = total <= ((+current || 1) - 1) * take;

  if (isOver) {
    const lastPage = Math.ceil(total / take);

    redirect(`${pathname}?page=${lastPage}`);
  }
};
