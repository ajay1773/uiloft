import type { Preview } from "@storybook/react";
import "@/library/styles/tailwind.css";
import "./storybook.scss";
import "@/design-system/scripts/theme-variables.scss";

// Helper function to update the data-theme attribute
const updateTheme = (theme: string) => {
  const htmlElement = document.documentElement;
  htmlElement.setAttribute("data-theme", theme);
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Global theme for components",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: ["light", "dark"], // Define the themes
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light", // Default theme
  },
  parameters: {
    options: {
      storySort: {
        order: ["Foundations", "Components"],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "fullScreen",
    backgrounds: {
      disabled: true,
    },
  },
  decorators: [
    (story, context) => {
      updateTheme(context.globals.theme);
      return story();
    },
  ],
};

export default preview;
