import type { Meta, StoryObj } from "@storybook/react";
import Carousel from "./Carousal";
import "./Carousel.module.scss";

const meta: Meta<typeof Carousel> = {
  title: "Components/Carousel",
  tags: ["autodocs"],
  component: Carousel,
  argTypes: {
    children: {
      control: "object",
      description: "An array of elements to be displayed inside the carousel.",
    },
    // visibleItems: {
    //   control: "number",
    //   description: "Number of items visible at a time in the carousel.",
    //   defaultValue: 3,
    // },
  },
  args: {
    children: Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="">
        Item {i + 1}
      </div>
    )),
  },
};

export default meta;

type Story = StoryObj<typeof Carousel>;

export const Default: Story = {};

export const TwoVisibleItems: Story = {
  args: {
    // visibleItems: 2,
  },
};

export const FourVisibleItems: Story = {
  args: {
    // visibleItems: 4,
  },
};
