import { Meta, StoryObj } from "@storybook/react";
import BottomSheet from "./BottomSheet";

const meta: Meta<typeof BottomSheet> = {
  title: "Components/BottomSheet",
  component: BottomSheet,
  argTypes: {
    open: { control: "boolean" },
    fullHeight: { control: "boolean" },
    title: { control: "text" },
    onOpenChange: { action: "onOpenChange" },
  },
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

export const Default: Story = {
  args: {
    open: false,
    fullHeight: false,
    title: "My Bottom Sheet",
  },
};

export const FullHeight: Story = {
  ...Default,
  args: {
    ...Default.args,
    fullHeight: true,
  },
};
