import RadioButton from "./RadioButton";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof RadioButton> = {
  title: "Components/RadioButton",
  component: RadioButton,
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "text",
      description: "name for the radio button",
    },
    value: {
      control: "text",
      description: "value for the radio button",
    },
    checked: {
      control: "boolean",
      description: "if button is clicked upon or not",
    },
    disabled: {
      control: "boolean",
      description: "toggle to indicate if radio button is disabled or not",
    },
    size: {
      control: "select",
      options: ["md", "sm"],
      description: "select size for the radio button",
    },
  },
  args: {
    name: "Default",
    value: "default",
    disabled: false,
    checked: true,
    size: "sm",
  },
};

export default meta;

type Story = StoryObj<typeof RadioButton>;

export const Default: Story = {
  args: {
    className: "!rounded-[2px\n]"
  }
};
