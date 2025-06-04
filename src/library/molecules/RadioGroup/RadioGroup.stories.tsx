import type { Meta, StoryObj } from "@storybook/react";
import RadioGroup from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  tags: ["autodocs"],
  component: RadioGroup,
  argTypes: {
    options: {
      control: "object",
      description: "Array of radio button options with labels and values.",
    },
    size: {
      control: "select",
      options: ["sm", "md"],
      description:
        "Defines the size of the radio buttons. Options: 'sm' (small) or 'md' (medium).",
    },
    defaultValue: {
      control: "text",
      description: "The default selected value for the radio group.",
    },
    name: {
      control: "text",
      description:
        "The name attribute for the radio group, used for form handling.",
    },
  },
  args: {
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3 (Disabled)", value: "option3", disabled: true },
    ],
    size: "md",
    defaultValue: "option1",
  },
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {};
