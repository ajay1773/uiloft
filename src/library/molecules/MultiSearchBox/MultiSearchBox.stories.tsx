import type { Meta, StoryObj } from "@storybook/react";
import MultiSearchBox, { MultiSearchBoxProps, Option } from "./MultiSearchBox";
import { useState } from "react";

const meta: Meta<typeof MultiSearchBox> = {
  title: "Components/MultiSearchBox",
  tags: ["autodocs"],
  component: MultiSearchBox,
  argTypes: {
    label: {
      control: "text",
      description: "Label for the search input field.",
    },
    required: {
      control: "boolean",
      description: "Marks the field as required if set to true.",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text shown in the input field.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input field when set to true.",
    },
    selectedValues: {
      control: "object",
      description: "An array of selected search values.",
    },
    options: {
      control: "object",
      description:
        "List of available options for search, including label, value, and optional metadata.",
    },
    onQueryChange: {
      action: "searched",
      description: "Callback triggered when the user types in the search box.",
    },
    onOptionSelect: {
      action: "searched",
      description: "Callback triggered when the user selects an option.",
    },
    helperText: {
      control: "text",
      description: "Additional helper text displayed below the input field.",
    },
  },
  args: {
    label: "Search user name",
    required: true,
    placeholder: "John doe....",
    disabled: false,
    selectedValues: [],
    helperText: "",
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
  },
};

export default meta;

type Story = StoryObj<typeof MultiSearchBox>;

// Reusable Template Wrapper
const MultiSearchBoxTemplate = (args: MultiSearchBoxProps) => {
  const [selectedValue, setSelectedValue] = useState<Option[]>(
    args.selectedValues ? args.selectedValues : []
  );

  const handleSelect = (newOption: Option) => {
    setSelectedValue([...selectedValue, newOption]);
  };

  return (
    <MultiSearchBox
      required={args.required}
      label={args.label}
      helperText={args.helperText}
      options={args.options}
      selectedValues={selectedValue}
      onOptionsChange={setSelectedValue}
      onQueryChange={() => {}}
      onOptionSelect={handleSelect}
      disabled={args.disabled}
      placeholder={args.placeholder}
    />
  );
};

// Stories using the Template
export const Default: Story = {
  render: (args) => <MultiSearchBoxTemplate {...args} />,
};

export const WithInitialQuery: Story = {
  render: (args) => <MultiSearchBoxTemplate {...args} />,
  args: {
    selectedValues: [
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
    ],
  },
};

export const Disabled: Story = {
  render: (args) => <MultiSearchBoxTemplate {...args} />,
  args: {
    disabled: true,
  },
};
