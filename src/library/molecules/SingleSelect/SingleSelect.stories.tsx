import type { Meta, StoryObj } from "@storybook/react";
import SingleSelect, { SingleSelectProps } from "./SingleSelect";
import { useState } from "react";

const meta: Meta<typeof SingleSelect> = {
  title: "Components/SingleSelect",
  tags: ["autodocs"],
  component: SingleSelect,
  argTypes: {
    options: {
      control: "object",
      description:
        "An array of options for the multi-select dropdown. Each option should have a `label`, `value`, and optional `config` metadata.",
    },
    placeholder: {
      control: "text",
      description:
        "The placeholder text displayed when no options are selected.",
    },
    selectedValue: {
      control: "text",
      description:
        "An single selected option. Can be used for controlled behavior.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the select input when set to `true`.",
    },
    primaryClassName: {
      control: "text",
      description: "Custom class name for styling the SingleSelect component.",
    },
  },
  args: {
    options: [
      {
        label: "John Doe",
        value: "john_doe",
        config: {
          metaDescription: "A random user named John Doe",
          metaView: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M16.6668 17.5C16.6668 16.337 16.6668 15.7555 16.5233 15.2824C16.2001 14.217 15.3664 13.3834 14.3011 13.0602C13.828 12.9167 13.2465 12.9167 12.0835 12.9167H7.91683C6.75386 12.9167 6.17237 12.9167 5.69921 13.0602C4.63388 13.3834 3.8002 14.217 3.47703 15.2824C3.3335 15.7555 3.3335 16.337 3.3335 17.5M13.7502 6.25C13.7502 8.32107 12.0712 10 10.0002 10C7.92909 10 6.25016 8.32107 6.25016 6.25C6.25016 4.17893 7.92909 2.5 10.0002 2.5C12.0712 2.5 13.7502 4.17893 13.7502 6.25Z"
                stroke="#717680"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ),
        },
      },
      {
        label: "Jane Smith",
        value: "jane_smith",
        config: {
          metaDescription: "A random user named Jane Smith",
          metaView: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M16.6668 17.5C16.6668 16.337 16.6668 15.7555 16.5233 15.2824C16.2001 14.217 15.3664 13.3834 14.3011 13.0602C13.828 12.9167 13.2465 12.9167 12.0835 12.9167H7.91683C6.75386 12.9167 6.17237 12.9167 5.69921 13.0602C4.63388 13.3834 3.8002 14.217 3.47703 15.2824C3.3335 15.7555 3.3335 16.337 3.3335 17.5M13.7502 6.25C13.7502 8.32107 12.0712 10 10.0002 10C7.92909 10 6.25016 8.32107 6.25016 6.25C6.25016 4.17893 7.92909 2.5 10.0002 2.5C12.0712 2.5 13.7502 4.17893 13.7502 6.25Z"
                stroke="#717680"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ),
        },
      },
      {
        label: "Alice Johnson",
        value: "alice_johnson",
        config: {
          metaDescription: "A random user named Alice Johnson",
          metaView: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M16.6668 17.5C16.6668 16.337 16.6668 15.7555 16.5233 15.2824C16.2001 14.217 15.3664 13.3834 14.3011 13.0602C13.828 12.9167 13.2465 12.9167 12.0835 12.9167H7.91683C6.75386 12.9167 6.17237 12.9167 5.69921 13.0602C4.63388 13.3834 3.8002 14.217 3.47703 15.2824C3.3335 15.7555 3.3335 16.337 3.3335 17.5M13.7502 6.25C13.7502 8.32107 12.0712 10 10.0002 10C7.92909 10 6.25016 8.32107 6.25016 6.25C6.25016 4.17893 7.92909 2.5 10.0002 2.5C12.0712 2.5 13.7502 4.17893 13.7502 6.25Z"
                stroke="#717680"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ),
        },
      },
    ],
    placeholder: "Select option",
    selectedValue: "",
    disabled: false,
    primaryClassName: "",
  },
};

export default meta;

type Story = StoryObj<typeof SingleSelect>;

// Reusable Template Wrapper
const SingleSelectTemplate = (args: SingleSelectProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(
    args.selectedValue
  );

  return (
    <SingleSelect
      {...args}
      selectedValue={selectedValue}
      onChange={(value) => setSelectedValue(value)}
    >
      <SingleSelect.Label>Team Member *</SingleSelect.Label>
      <SingleSelect.Initiator />
      <SingleSelect.OptionsWrapper>
        {args.options.map((option) => (
          <SingleSelect.Option key={option.value} {...option} />
        ))}
      </SingleSelect.OptionsWrapper>
    </SingleSelect>
  );
};

// Stories using the Template
export const Default: Story = {
  render: (args) => <SingleSelectTemplate {...args} />,
};

export const PreSelected: Story = {
  render: (args) => <SingleSelectTemplate {...args} />,
  args: {
    selectedValue: "john_doe",
  },
};
