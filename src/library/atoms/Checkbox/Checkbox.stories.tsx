import type { Meta, StoryObj } from "@storybook/react";
import Checkbox from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["md", "sm"],
      description: "select size for the checkbox",
    },
    checked: {
      control: "boolean",
      description: "if the checkbox is actually checked or not",
    },
    disabled: {
      control: "boolean",
      description: "toggle if the checkbox is disabled or not",
    },
    indeterminate: {
      control: "boolean",
      description: "toggle if the checkbox is indeterminate or not",
    },
  },
  args: {
    size: "sm",
    disabled: false,
    indeterminate: false,
    checked: true,
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    size: "sm",
    disabled: false,
  },
};

export const Indeterminate: Story = {
  args: {
    size: "sm",
    disabled: false,
    indeterminate: true,
  },
};
