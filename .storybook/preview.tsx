import type { Preview } from "@storybook/react";
import "../src/style/tailwind.css";
import { Providers } from "@/layouts/providers";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Toaster } from "@/components/ui/sonner";

const preview: Preview = {
  decorators: [
    (Story) => (
      <>
        <Providers>
          <div className="grid gap-4 h-full">
            <ThemeToggle />
            <div className="flex-1">
              <Story />
            </div>
          </div>
        </Providers>
        <Toaster closeButton position="top-right" />
      </>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
