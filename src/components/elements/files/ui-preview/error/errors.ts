/* eslint-disable max-classes-per-file */
const postMessageErrors = {
  TimeOut: {
    message: "Time out error",
  },

  NotAction: {
    message: "Not action error",
  },

  Render: {
    message: "Not render height error",
  },

  Reload: {
    message: "reload error",
  },

  UnknownMessage: {
    message: "Unknown error",
  },
};

export type PostMessageErrors = typeof postMessageErrors;

export type PostMessageErrorsMessage = {
  [T in keyof PostMessageErrors]: PostMessageErrors[T]["message"];
}[keyof PostMessageErrors];

export class PostMessageError extends Error {
  message: PostMessageErrorsMessage | string;

  constructor(
    public module: keyof PostMessageErrors,
    message?: string
  ) {
    super();
    this.message = message || postMessageErrors[module].message;
    this.module = module;
  }
}

export class TimeOutError extends PostMessageError {
  constructor() {
    super("TimeOut");
  }
}

export class NotActionError extends PostMessageError {
  constructor() {
    super("NotAction");
  }
}

export class RenderError extends PostMessageError {
  constructor() {
    super("Render");
  }
}

export class ReloadError extends PostMessageError {
  constructor() {
    super("Reload");
  }
}

export class UnknownMessageError extends PostMessageError {
  constructor(message?: string) {
    super("UnknownMessage", message);
  }
}
