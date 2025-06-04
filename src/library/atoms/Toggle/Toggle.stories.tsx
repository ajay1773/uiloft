import Toggle from "./Toggle";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  tags: ["autodocs"],
  component: Toggle,
  argTypes: {
    active: {
      control: "boolean",
      description: "toggle to tell if the toggle is active or not",
    },
    size: {
      control: "select",
      options: ["md", "sm"],
      description: "select size for the toggle",
    },
    type: {
      control: "select",
      options: ["slim", "default"],
      description: "select type for the toggle",
    },
    disabled: {
      control: "boolean",
      description: "if the toggle is disabled or not",
    },
  },
  args: {
    active: true,
    size: "sm",
    type: "default",
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    active: true,
  },
};

export const Disabled: Story = {
  args: {
    active: true,
    disabled: true,
  },
};
