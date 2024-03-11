export const getBuildDate = () => {
  return new Date().toLocaleDateString("ja-JP", {
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tokyo",
    hour: "numeric",
    minute: "numeric",
  });
};
