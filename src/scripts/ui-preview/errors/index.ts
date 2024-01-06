/* eslint-disable max-classes-per-file */
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

  BadCombinationExtensions: {
    message: "Bad combination extensions error",
  },

  TimeOut: {
    message: "Time out error",
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

export class BadCombinationExtensionsError extends ModuleError {
  constructor() {
    super("BadCombinationExtensions");
  }
}

export class TimeOutError extends ModuleError {
  constructor() {
    super("TimeOut");
  }
}
