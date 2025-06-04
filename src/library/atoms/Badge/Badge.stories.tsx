import type { Meta, StoryObj } from "@storybook/react";
import Badge from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  tags: ["autodocs"],
  component: Badge,
  argTypes: {
    color: {
      control: { type: "select" },
      options: [
        "brand",
        "warning",
        "success",
        "gray-blue",
        "blue-gray",
        "blue-light",
        "indigo",
        "purple",
        "blue",
        "pink",
        "orange",
        "error",
        "gray",
      ],
      defaultValue: "brand",
      description: "Defines the color of the badge.",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      defaultValue: "md",
      description: "Specifies the size of the badge.",
    },
    type: {
      control: { type: "select" },
      options: ["pill-color", "pill-outline", "badge-color", "badge-modern"],
      defaultValue: "pill-color",
      description: "Determines the style of the badge.",
    },
    className: {
      control: false,
      description: "Optional custom class names for additional styling.",
    },
    preIcon: {
      control: false,
      description: "An optional icon displayed before the badge text.",
    },
    postIcon: {
      control: false,
      description: "An optional icon displayed after the badge text.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    size: "md",
    color: "blue",
    children: "Default Text",
  },
};
export const WithPreTextIcon: Story = {
  args: {
    size: "md",
    children: "With Pre Icon",
    color: "warning",
    preIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
      >
        <circle cx="3" cy="3" r="3" fill="#F04438" />
      </svg>
    ),
  },
};

export const WithPostTextIcon: Story = {
  args: {
    size: "md",
    children: "With Post Icon",
    color: "error",
    postIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M9 3L3 9M3 3L9 9"
          stroke="#F97066"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
};
export const WithOnlyIcon: Story = {
  args: {
    size: "md",
    hasIconOnly: true,
    children: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
      >
        <path
          d="M5 1.5V8.5M1.5 5H8.5"
          stroke="#7A5AF8"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    color: "purple",
  },
};
