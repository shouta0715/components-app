export const setupNextParameter = (
  pathname: string,
  query?: Record<string, string>
) => {
  return {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: `/${pathname}`,
        query,
      },
    },
  };
};
