/* eslint-disable max-classes-per-file */
import { Prisma } from "@prisma/client";

import { ValiError } from "valibot";

/* eslint-disable max-classes-per-file */
export const errors = {
  400: { message: "Bad Request" },
  401: { message: "Unauthorized" },
  403: { message: "Forbidden" },
  404: { message: "Not Found" },
  409: { message: "Conflict" },
  500: { message: "Internal Server Error" },
} as const;

export type ErrorType = keyof typeof errors;
export type Errors = typeof errors;
export type ErrorsMessage = {
  [T in ErrorType]: Errors[T]["message"];
}[ErrorType];

export type Error = {
  status: ErrorType;
  message: ErrorsMessage;
};

export class HttpError extends Error {
  message: ErrorsMessage;

  constructor(public status: ErrorType) {
    super();
    this.message = errors[status].message;
    this.status = status;
  }

  throwMessage() {
    return { message: this.message, status: this.status };
  }
}

export class BadRequestError extends HttpError {
  constructor() {
    super(400);
  }
}

export class UnauthorizedError extends HttpError {
  constructor() {
    super(401);
  }
}

export class ForbiddenError extends HttpError {
  constructor() {
    super(403);
  }
}

export class NotFoundError extends HttpError {
  constructor() {
    super(404);
  }
}

export class ConflictError extends HttpError {
  constructor() {
    super(409);
  }
}

export class InternalServerError extends HttpError {
  constructor() {
    super(500);
  }
}

export const throwHttpErrorFromStatus = (status: ErrorType | number): never => {
  switch (status) {
    case 400:
      throw new BadRequestError();
    case 401:
      throw new UnauthorizedError();
    case 403:
      throw new ForbiddenError();
    case 404:
      throw new NotFoundError();
    case 409:
      throw new ConflictError();
    case 500:
      throw new InternalServerError();
    default:
      throw new InternalServerError();
  }
};

export const getErrorStatusFromError = (error: unknown): ErrorType => {
  if (error instanceof ValiError) {
    return 400;
  }

  if (error instanceof UnauthorizedError) {
    return 401;
  }

  if (error instanceof ForbiddenError) {
    return 403;
  }

  if (error instanceof HttpError) {
    return error.status;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code.includes("P10")) {
      return 500;
    }
    if (error.code === "P2002" || error.code === "P2003") {
      return 409;
    }

    return 404;
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return 404;
  }

  return 500;
};

export const handleApiError = ({ error }: { error: unknown }) => {
  if (error instanceof ValiError) {
    const status = 400;
    const { message } = errors[status];

    return Response.json({ message }, { status });
  }

  if (error instanceof UnauthorizedError) {
    const status = 401;
    const { message } = errors[status];

    return Response.json({ message }, { status });
  }

  if (error instanceof ForbiddenError) {
    const status = 403;
    const { message } = errors[status];

    return Response.json({ message }, { status });
  }

  if (error instanceof HttpError) {
    const { status, message } = error.throwMessage();

    return Response.json({ message }, { status });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code.includes("P10")) {
      const status = 500;
      const { message } = errors[status];

      return Response.json({ message }, { status });
    }
    if (error.code === "P2002" || error.code === "P2003") {
      const status = 409;
      const { message } = errors[status];

      return Response.json({ message }, { status });
    }

    const status = 404;
    const { message } = errors[status];

    return Response.json({ message }, { status });
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    const status = 404;
    const { message } = errors[status];

    return Response.json({ message }, { status });
  }

  const status = 500;

  const { message } = errors[status];

  return Response.json({ message }, { status });
};
