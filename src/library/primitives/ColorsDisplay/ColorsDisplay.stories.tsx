import colors from "@/design-system/json/primitives.json";
import type { Meta, StoryObj } from "@storybook/react";
import ColorsDisplay, { ColorsData } from "./ColorsDisplay";

const meta: Meta<typeof ColorsDisplay> = {
  title: "Foundations/Primitives",
  component: ColorsDisplay,
  argTypes: {
    colors,
  },
};

export default meta;

type Story = StoryObj<typeof ColorsDisplay>;

export const Default: Story = {
  args: {
    colors: colors as unknown as ColorsData,
  },
};
