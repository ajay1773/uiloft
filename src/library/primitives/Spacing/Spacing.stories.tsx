import type { Meta, StoryObj } from "@storybook/react";
import Spacing from "./Spacing";

const meta: Meta<typeof Spacing> = {
  title: "Foundations/Spacing",
  component: Spacing,
  argTypes: {
    theme: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Spacing>;

export const Default: Story = {
  render: (_args, { globals }) => {
    return <Spacing theme={globals.theme} />;
  },
};
