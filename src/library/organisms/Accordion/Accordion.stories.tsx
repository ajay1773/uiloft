import type { Meta, StoryObj } from "@storybook/react";
import Accordion from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  tags: ["autodocs"],
  component: Accordion,
  argTypes: {
    items: {
      control: "object",
      description:
        "An array of accordion items, each containing an `id`, `trigger`, and `content`.",
    },
    defaultValue: {
      control: "text",
      description:
        "The ID of the accordion item that should be open by default.",
    },
    collapsible: {
      control: "boolean",
      description:
        "Determines whether all accordion items can be collapsed or if one must remain open.",
    },
  },
  args: {
    items: [
      {
        id: "item-1",
        trigger: "Is it accessible?",
        content: "Yes, it adheres to the WAI-ARIA design pattern.",
      },
      {
        id: "item-2",
        trigger: "Is it unstyled?",
        content:
          "Yes, it's unstyled by default, giving you freedom over the look and feel.",
      },
      {
        id: "item-3",
        trigger: "Can it be animated?",
        content: "Yes! You can animate the Accordion with CSS or JavaScript.",
      },
    ],
    defaultValue: "",
    collapsible: true,
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {};

export const WithDefaultOpenItem: Story = {
  args: {
    defaultValue: "item-1",
  },
};

export const WithMultipleOpenItems: Story = {
  args: {
    type: "multiple",
  },
};
