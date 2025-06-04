import type { Meta, StoryObj } from "@storybook/react";
import Containers from "./Containers";

const meta: Meta<typeof Containers> = {
  title: "Foundations/Containers",
  component: Containers,
  argTypes: {
    theme: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Containers>;

export const Default: Story = {
  render: (_args, { globals }) => {
    return <Containers theme={globals.theme} />;
  },
};
