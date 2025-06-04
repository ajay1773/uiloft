import Spinner from "./Spinner";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  tags: ["autodocs"],
  component: Spinner,
  argTypes: {
    width: {
      control: "number",
      description: "select width for the Spinner",
    },
    height: {
      control: "number",
      description: "select height for the Spinner",
    },
  },
  args: {
    width: 24,
    height: 30,
  },
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {},
};
