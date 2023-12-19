/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { configDefaults, defineConfig } from "vitest/config";

const alias = {
  "@": `${__dirname}/src`,
};

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./__tests__/setup.ts"],
    include: ["./src/**/*.test.{ts,tsx}", "./tests/**/*.test.{ts,tsx}"],
    exclude: [
      ...configDefaults.exclude,
      "src/**/e2e/**/*",
      "*.config.{ts,js,tsx}",
    ],
  },
  resolve: { alias },
});
