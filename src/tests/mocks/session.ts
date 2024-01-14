import { Session } from "next-auth";
import { vi } from "vitest";

export const mockSession: Session = {
  user: {
    id: "test-user",
    name: "test-user",
    email: "test@gmail.com",
    image: "/test-avatar.png",
  },
  expires: "mock",
};

vi.mock("@/lib/auth", () => {
  const mock: Session = {
    ...mockSession,
  };

  return {
    __esModule: true,
    auth: vi.fn(() => mock),
  };
});
