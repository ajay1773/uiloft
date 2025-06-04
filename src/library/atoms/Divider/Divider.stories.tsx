import { Button, Text } from "uiloft";
import Divider from "./Divider";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  tags: ["autodocs"],
  component: Divider,
  argTypes: {
    className: {
      control: "boolean",
      description: "Class to override styles",
    },
  },
  args: {
    className: "",
  },
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Button>CTA</Button>
      <Divider {...args} />
      <Text>Press the Button</Text>
    </div>
  ),
};
