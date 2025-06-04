import type { Meta, StoryObj } from "@storybook/react";
import TextField from "./TextField";

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "placeholder to show for field",
    },
    size: {
      control: "select",
      description: "label to show for field",
      options: ["md", "sm"],
    },
    label: {
      control: "text",
      description: "label to show for field",
    },
    required: {
      type: "boolean",
      description: "tell if the field is a required field or not",
    },
    destructive: {
      type: "boolean",
      description: "tell if the field has any error or not",
    },
    helperIcon: {
      control: "object",
      description:
        "pass a svg or any other element to act as a helper action for field",
    },
    leadingIcon: {
      control: "object",
      description:
        "pass a svg or any other element to act as a pre input icon for field",
    },
    disabled: {
      control: "boolean",
      description: "to tell if the field is disabled or not",
    },
    helperText: {
      control: "text",
      description: "helper text for field",
    },
    name: {
      control: "text",
      description: "name for field",
    },
  },
  args: {
    placeholder: "johndoe@123.com",
    label: "email",
    required: true,
    size: "sm",
    helperIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <g clip-path="url(#clip0_6237_5645)">
          <path
            d="M6.05992 5.99998C6.21665 5.55442 6.52602 5.17872 6.93322 4.9394C7.34042 4.70009 7.81918 4.61261 8.2847 4.69245C8.75022 4.7723 9.17246 5.01433 9.47664 5.37567C9.78081 5.737 9.94729 6.19433 9.94659 6.66665C9.94659 7.99998 7.94659 8.66665 7.94659 8.66665M7.99992 11.3333H8.00659M14.6666 7.99998C14.6666 11.6819 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6819 1.33325 7.99998C1.33325 4.31808 4.31802 1.33331 7.99992 1.33331C11.6818 1.33331 14.6666 4.31808 14.6666 7.99998Z"
            stroke="#A4A7AE"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_6237_5645">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    leadingIcon: null,
    disabled: false,
    helperText: "Enter your authorized email here.",
  },
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    label: "Name",
    placeholder: "John Doe",
  },
};

export const WithLeadingIcon: Story = {
  args: {
    ...Default.args,
    leadingIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="16"
        viewBox="0 0 20 16"
        fill="none"
      >
        <path
          d="M1.66675 3.83331L8.47085 8.59618C9.02182 8.98187 9.29731 9.17471 9.59697 9.2494C9.86166 9.31538 10.1385 9.31538 10.4032 9.2494C10.7029 9.17471 10.9783 8.98187 11.5293 8.59618L18.3334 3.83331M5.66675 14.6666H14.3334C15.7335 14.6666 16.4336 14.6666 16.9684 14.3942C17.4388 14.1545 17.8212 13.772 18.0609 13.3016C18.3334 12.7668 18.3334 12.0668 18.3334 10.6666V5.33331C18.3334 3.93318 18.3334 3.23312 18.0609 2.69834C17.8212 2.22793 17.4388 1.84548 16.9684 1.6058C16.4336 1.33331 15.7335 1.33331 14.3334 1.33331H5.66675C4.26662 1.33331 3.56655 1.33331 3.03177 1.6058C2.56137 1.84548 2.17892 2.22793 1.93923 2.69834C1.66675 3.23312 1.66675 3.93318 1.66675 5.33331V10.6666C1.66675 12.0668 1.66675 12.7668 1.93923 13.3016C2.17892 13.772 2.56137 14.1545 3.03177 14.3942C3.56655 14.6666 4.26662 14.6666 5.66675 14.6666Z"
          stroke="#717680"
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
};

export const Destructive: Story = {
  args: {
    ...Default.args,
    destructive: true,
    helperIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <g clip-path="url(#clip0_3531_403167)">
          <path
            d="M7.99992 5.33337V8.00004M7.99992 10.6667H8.00659M14.6666 8.00004C14.6666 11.6819 11.6818 14.6667 7.99992 14.6667C4.31802 14.6667 1.33325 11.6819 1.33325 8.00004C1.33325 4.31814 4.31802 1.33337 7.99992 1.33337C11.6818 1.33337 14.6666 4.31814 14.6666 8.00004Z"
            stroke="#F04438"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_3531_403167">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    helperText: "You have entered wrong email",
  },
};

export const PaymentInput: Story = {
  args: {
    ...Default.args,
    label: "Card Number",
    leadingIcon: (
      <div className="flex justify-center items-center rounded-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="14"
          viewBox="0 0 23 14"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.179 11.8295C9.99493 12.8275 8.45902 13.43 6.78069 13.43C3.03582 13.43 0 10.4303 0 6.73003C0 3.02972 3.03582 0.0300293 6.78069 0.0300293C8.45902 0.0300293 9.99493 0.632527 11.179 1.63057C12.363 0.632527 13.8989 0.0300293 15.5773 0.0300293C19.3221 0.0300293 22.358 3.02972 22.358 6.73003C22.358 10.4303 19.3221 13.43 15.5773 13.43C13.8989 13.43 12.363 12.8275 11.179 11.8295Z"
            fill="#ED0006"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.1792 11.8295C12.6371 10.6006 13.5616 8.77198 13.5616 6.73003C13.5616 4.68807 12.6371 2.85947 11.1792 1.63057C12.3632 0.632526 13.8992 0.0300293 15.5775 0.0300293C19.3224 0.0300293 22.3582 3.02972 22.3582 6.73003C22.3582 10.4303 19.3224 13.43 15.5775 13.43C13.8992 13.43 12.3632 12.8275 11.1792 11.8295Z"
            fill="#F9A000"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.1788 11.8295C12.6367 10.6006 13.5611 8.77199 13.5611 6.73005C13.5611 4.68811 12.6367 2.85952 11.1788 1.63062C9.72084 2.85952 8.79639 4.68811 8.79639 6.73005C8.79639 8.77199 9.72084 10.6006 11.1788 11.8295Z"
            fill="#FF5E00"
          />
        </svg>
      </div>
    ),
    helperText: "Enter you credit card number",
  },
};
