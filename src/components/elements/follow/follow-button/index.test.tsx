import { act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HttpResponse, http } from "msw";
import { toast } from "sonner";
import { afterEach, describe, expect, test, vi } from "vitest";

import { FollowButton } from "@/components/elements/follow/follow-button";

import { FollowButtonProps } from "@/components/elements/follow/follow-button/useFollowButton";
import { Providers } from "@/layouts/providers";
import { defineFollowFactory, defineUserFactory } from "@/tests/fabbrica";
import { startMsw } from "@/tests/mocks/setup";

function wait(ms = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function setup(props?: Partial<FollowButtonProps>) {
  const onToast = vi.fn();

  vi.spyOn(toast, "error").mockImplementation(onToast);
  const follower = defineUserFactory();
  const following = defineUserFactory();

  const follows = defineFollowFactory({
    defaultData: {
      follower,
      following,
    },
  });

  const me = await follower.create();
  const target = await following.create();

  const created = await follows.create();

  const arg = {
    initialFollowed: false,
    followerId: me.id,
    followingId: target.id,
    ...props,
  };

  const result = render(<FollowButton {...arg} />, {
    wrapper: Providers,
  });

  return { ...result, created, me, target, onToast };
}

startMsw(
  http.post("/api/follows", async () => {
    return HttpResponse.json(
      {
        message: "success",
        followed: true,
      },
      { status: 200 }
    );
  })
);

describe("FollowButton", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test("follows", async () => {
    const { getByRole } = await setup();

    const button = getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("フォロー");
    await userEvent.click(button);

    await act(async () => {
      await wait(500);
    });

    expect(button).toHaveTextContent("フォロー中");
  });

  test("unfollows", async () => {
    const { getByRole } = await setup({ initialFollowed: true });

    const button = getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("フォロー中");
    await userEvent.click(button);

    await act(async () => {
      await wait(500);
    });

    expect(button).toHaveTextContent("フォロー");
  });
});
