import type { Meta, StoryObj } from "@storybook/react";
import Text from "./Text";

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  tags: ["autodocs"],
  component: Text,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["regular", "medium", "semibold", "bold"],
      description: "Defines the font weight or emphasis of the text.",
    },
    size: {
      control: { type: "select" },
      options: [
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
        "display-xs",
        "display-sm",
        "display-md",
        "display-lg",
        "display-xl",
        "display-2xl",
      ],
      description:
        "Specifies the text size, ranging from extra small to large display sizes.",
    },
    as: {
      control: { type: "select" },
      options: ["span", "p", "h1", "h2", "h3", "div"],
      description: "Determines the HTML tag used to render the text component.",
    },
    className: {
      control: "text",
      description: "Optional additional CSS classes for custom styling.",
    },
    children: {
      control: "text",
      defaultValue: "Sample Text",
      description: "The text content to be displayed inside the component.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    variant: "medium",
    size: "md",
    as: "span",
    children: "Default Text",
  },
};

export const Regular: Story = {
  args: {
    variant: "regular",
    size: "sm",
    as: "p",
    children: "This is Regular Text",
  },
};

export const Bold: Story = {
  args: {
    variant: "bold",
    size: "lg",
    as: "h1",
    children: "Bold Heading",
  },
};
