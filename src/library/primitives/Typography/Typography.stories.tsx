import type { Meta, StoryObj } from "@storybook/react";
import Typography from "./Typography";

const meta: Meta<typeof Typography> = {
  title: "Foundations/Typography",
  component: Typography,
  argTypes: {
    theme: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  render: (_args, { globals }) => {
    return <Typography theme={globals.theme} />;
  },
};
