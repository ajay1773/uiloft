import type { Meta, StoryObj } from "@storybook/react";
import CustomButton from "./Button";

const meta: Meta<typeof CustomButton> = {
  title: "Components/Button",
  tags: ["autodocs"],
  component: CustomButton,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "link"],
      description: "The style variant of the button.",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl"],
      description: "The size of the button.",
    },
    isDisabled: {
      control: "boolean",
      description: "Indicates if the button is disabled.",
    },
    leadingIcon: {
      control: "object", // Icons are not directly editable in Storybook controls
      description: "Optional icon displayed before the button text.",
    },
    trailingIcon: {
      control: "object", // Icons are not directly editable in Storybook controls
      description: "Optional icon displayed after the button text.",
    },
    hasLeadingIcon: {
      control: "boolean",
      description: "boolean to tell if button has leading icon or not",
    },
    hasTrailingIcon: {
      control: "boolean",
      description: "boolean to tell if button has trailing icon or not",
    },
    children: {
      control: "text",
      description: "The content inside the button.",
    },
  },
  args: {
    variant: "primary",
    size: "md",
    isDisabled: false,
    hasLeadingIcon: false,
    leadingIcon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m4 12 6 6L20 6"
          stroke="#000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    hasTrailingIcon: false,
    trailingIcon: <></>,
  },
};

export default meta;
type Story = StoryObj<typeof CustomButton>;

export const Primary: Story = {
  args: {
    children: "Primary button CTA",
    variant: "primary",
    size: "lg",
    isDisabled: false,
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button CTA",
    variant: "secondary",
    size: "md",
    isDisabled: false,
  },
};

export const Tertiary: Story = {
  args: {
    children: "Tertiary Button CTA",
    variant: "tertiary",
    size: "md",
    isDisabled: false,
  },
};

export const LinkGray: Story = {
  args: {
    children: "Link Button CTA",
    variant: "link",
    size: "md",
    isDisabled: false,
  },
};

export const IconButton: Story = {
  args: {
    ...Primary.args,
    children: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M18 6L6 18M6 6L18 18"
          stroke="#717680"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    variant: "secondary",
    size: "md",
    isDisabled: false,
  },
};
