import type { Meta, StoryObj } from "@storybook/react";
import Width from "./Width";

const meta: Meta<typeof Width> = {
  title: "Foundations/Width",
  component: Width,
  argTypes: {
    theme: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Width>;

export const Default: Story = {
  render: (_args, { globals }) => {
    return <Width theme={globals.theme} />;
  },
};
