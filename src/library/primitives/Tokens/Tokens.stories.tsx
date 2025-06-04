import type { Meta, StoryObj } from "@storybook/react";
import Tokens from "./Tokens";

const meta: Meta<typeof Tokens> = {
  title: "Foundations/Tokens",
  component: Tokens,
  argTypes: {
    theme: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tokens>;

export const Default: Story = {
  render: (_args, { globals }) => {
    return <Tokens theme={globals.theme} />;
  },
};
