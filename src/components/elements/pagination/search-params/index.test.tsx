import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { SearchParamsPagination } from "@/components/elements/pagination/search-params";

const user = userEvent.setup();

const setup = (page: number, total = 100) => {
  mockRouter.setCurrentUrl({
    query: {
      page: page.toString(),
    },
  });

  const rendered = render(<SearchParamsPagination total={total} />);

  return { ...rendered };
};

describe("components/elements/pagination/search-params", () => {
  test("if current page is 1, should render next link", () => {
    const { getByText } = setup(1);

    expect(getByText("次のページ")).toBeInTheDocument();
  });

  test("if current page is 1, should not render prev link", () => {
    const { queryByText } = setup(1);

    expect(queryByText("前のページ")).toBeNull();
  });

  test("if click next, should call onTransition next page", async () => {
    const initialPage = 1;

    const { getByText } = setup(initialPage);

    await user.click(getByText("次のページ"));

    expect(mockRouter.query.page).toBe((initialPage + 1).toString());
  });

  test("if current page is 2, should render prev link", () => {
    const { getByText } = setup(2);

    expect(getByText("前のページ")).toBeInTheDocument();

    expect(getByText("次のページ")).toBeInTheDocument();
  });

  test("if over total, should not render next link", () => {
    const { queryByText } = setup(6);

    expect(queryByText("次のページ")).toBeNull();

    expect(queryByText("前のページ")).toBeInTheDocument();
  });
  test("if click prev, should call onTransition prev page", async () => {
    const initialPage = 2;

    const { getByText } = setup(initialPage);

    await user.click(getByText("前のページ"));

    expect(mockRouter.query.page).toBe((initialPage - 1).toString());
  });
});
