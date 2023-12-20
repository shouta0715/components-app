/* eslint-disable max-classes-per-file */
import { NextApiResponse } from "next";
import { ValiError } from "valibot";

/* eslint-disable max-classes-per-file */
export const errors = {
  400: { message: "Bad Request" },
  401: { message: "Unauthorized" },
  403: { message: "Forbidden" },
  404: { message: "Not Found" },
  405: { message: "Method Not Allowed" },
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

export class MethodNotAllowedError extends HttpError {
  constructor() {
    super(405);
  }
}

export class InternalServerError extends HttpError {
  constructor() {
    super(500);
  }
}

export const throwHttpErrorFromStatus = (status: ErrorType): never => {
  switch (status) {
    case 400:
      throw new BadRequestError();
    case 401:
      throw new UnauthorizedError();
    case 403:
      throw new ForbiddenError();
    case 404:
      throw new NotFoundError();
    case 405:
      throw new MethodNotAllowedError();
    case 500:
      throw new InternalServerError();
    default:
      throw new InternalServerError();
  }
};

export const handleApiError = ({
  res,
  error,
}: {
  res: NextApiResponse<Error>;
  error: unknown;
}) => {
  if (error instanceof ValiError) {
    const status = 400;
    const { message } = errors[status];
    res.status(status).json({
      message,
      status,
    });

    return;
  }

  if (error instanceof HttpError) {
    const { status, message } = error.throwMessage();
    res.status(status).json({ message, status });

    return;
  }

  const status = 500;

  const { message } = errors[status];

  res.status(status).json({
    message,
    status,
  });
};

export const notArrowedHandler = (res: NextApiResponse<Error>) => {
  const status = 405;
  const { message } = errors[status];
  res.status(status).json({
    message,
    status,
  });
};

const modulesErrors = {
  CodeBundler: {
    message: "Code bundler error",
  },

  Compiler: {
    message: "Code compiler error",
  },
  PackageResolve: {
    message: "Package resolve error",
  },
  Minify: {
    message: "Minify error",
  },
} as const;

export type ModulesErrors = typeof modulesErrors;

export type ModulesErrorsMessage = {
  [T in keyof ModulesErrors]: ModulesErrors[T]["message"];
}[keyof ModulesErrors];

export class ModuleError extends Error {
  message: ModulesErrorsMessage;

  constructor(public module: keyof ModulesErrors) {
    super();
    this.message = modulesErrors[module].message;
    this.module = module;
  }

  throwMessage() {
    return { message: this.message, module: this.module };
  }
}

export class CodeBundlerError extends ModuleError {
  constructor() {
    super("CodeBundler");
  }
}

export class CompilerError extends ModuleError {
  constructor() {
    super("Compiler");
  }
}

export class PackageError extends ModuleError {
  constructor() {
    super("PackageResolve");
  }
}

export class MinifyError extends ModuleError {
  constructor() {
    super("Minify");
  }
}
