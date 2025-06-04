import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";

const config: StorybookConfig = {
  stories: [
    "../src/library/**/*.mdx",
    "../src/library/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-actions",
    "@storybook/addon-docs",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");

    return mergeConfig(config, {
      css: {
        postcss: null,
        preprocessorOptions: {
          scss: {
            additionalData: `
                      @import "${path.resolve(
                        __dirname,
                        "../src/library/styles/mixins.scss"
                      )}";
                  `,
          },
        },
      },
    });
  },
};
export default config;
