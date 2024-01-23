import { type RequestHandler } from "msw";
import { setupServer } from "msw/node";

import { afterAll, afterEach, beforeAll } from "vitest";

export const setupMsw = (...handlers: RequestHandler[]) => {
  const server = setupServer(...handlers);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  return server;
};

export const startMsw = (...handlers: RequestHandler[]) => {
  const server = setupServer(...handlers);

  server.listen();
};

export const testBaseURL = "http://example:3000";
