import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";

export const formatDateDistance = (date: Date) => {
  const distance = formatDistanceToNow(date, { addSuffix: true, locale: ja });

  return distance;
};
