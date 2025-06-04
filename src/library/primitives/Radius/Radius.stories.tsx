import type { Meta, StoryObj } from "@storybook/react";
import Radius from "./Radius";

const meta: Meta<typeof Radius> = {
  title: "Foundations/Radius",
  component: Radius,
  argTypes: {
    theme: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Radius>;

export const Default: Story = {
  render: (_args, { globals }) => {
    return <Radius theme={globals.theme} />;
  },
};
