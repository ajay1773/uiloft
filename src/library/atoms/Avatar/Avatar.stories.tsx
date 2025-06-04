import type { Meta, StoryObj } from "@storybook/react";
import Avatar from "./Avatar";

const Indicator = () => {
  return (
    <div className="flex items-center justify-center p-[2px] bg-[var(--colors-background-bg-primary)] rounded-full">
      <span className="block rounded-full w-[10px] h-[10px] bg-green-700"></span>
    </div>
  );
};

const VerifiedTick = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <g clip-path="url(#clip0_3302_420365)">
        <path
          d="M10.8111 2.47944C10.944 2.80101 11.1993 3.05662 11.5206 3.19007L12.6475 3.65685C12.9691 3.79006 13.2246 4.04557 13.3579 4.36717C13.4911 4.68877 13.4911 5.05011 13.3579 5.37171L12.8914 6.49781C12.7581 6.81955 12.758 7.18126 12.8918 7.50285L13.3575 8.6286C13.4235 8.78789 13.4575 8.95862 13.4575 9.13105C13.4576 9.30349 13.4236 9.47423 13.3576 9.63354C13.2916 9.79284 13.1949 9.93759 13.073 10.0595C12.951 10.1814 12.8062 10.2781 12.6469 10.344L11.5208 10.8105C11.1993 10.9434 10.9436 11.1987 10.8102 11.52L10.3434 12.6469C10.2102 12.9685 9.9547 13.224 9.6331 13.3572C9.3115 13.4905 8.95015 13.4905 8.62855 13.3572L7.50246 12.8908C7.18085 12.7579 6.81964 12.7582 6.49823 12.8916L5.37133 13.3577C5.04991 13.4906 4.68887 13.4905 4.36754 13.3574C4.0462 13.2243 3.79083 12.969 3.65753 12.6478L3.19061 11.5206C3.05765 11.199 2.80242 10.9434 2.48105 10.8099L1.35415 10.3431C1.03269 10.21 0.777252 9.95464 0.643992 9.63323C0.510732 9.31181 0.510551 8.95064 0.64349 8.62909L1.10993 7.50299C1.24282 7.18139 1.24255 6.82017 1.10918 6.49876L0.643405 5.37105C0.577367 5.21177 0.543363 5.04103 0.543336 4.8686C0.543308 4.69617 0.577257 4.52542 0.643244 4.36612C0.70923 4.20681 0.80596 4.06207 0.927907 3.94016C1.04985 3.81826 1.19463 3.72157 1.35395 3.65564L2.48005 3.1892C2.80134 3.05635 3.0568 2.80144 3.19034 2.48044L3.65712 1.35354C3.79033 1.03194 4.04584 0.776428 4.36744 0.643217C4.68904 0.510006 5.05039 0.510006 5.37199 0.643217L6.49808 1.10966C6.81969 1.24254 7.1809 1.24227 7.50231 1.10891L8.62969 0.64394C8.95124 0.510804 9.31251 0.510831 9.63405 0.644016C9.95558 0.7772 10.2111 1.03264 10.3443 1.35415L10.8112 2.48139L10.8111 2.47944Z"
          fill="#2E90FA"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.7416 5.16505C9.83513 5.01815 9.86646 4.84012 9.82872 4.67012C9.79098 4.50012 9.68725 4.35207 9.54035 4.25855C9.39346 4.16503 9.21543 4.13369 9.04542 4.17143C8.87542 4.20917 8.72738 4.3129 8.63385 4.4598L6.06398 8.49792L4.88798 7.02792C4.77926 6.89193 4.62097 6.8047 4.44793 6.78542C4.27489 6.76614 4.10128 6.81639 3.96529 6.92511C3.8293 7.03383 3.74207 7.19212 3.72279 7.36516C3.70351 7.5382 3.75376 7.71181 3.86248 7.8478L5.61248 10.0353C5.6777 10.1169 5.76146 10.1818 5.85681 10.2245C5.95216 10.2673 6.05633 10.2866 6.16065 10.2809C6.26498 10.2753 6.36646 10.2448 6.45663 10.1921C6.54681 10.1393 6.62308 10.0657 6.6791 9.97755L9.7416 5.16505Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_3302_420365">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    image: {
      control: "text",
      description: "url for image which has to be rendered in avatar",
    },
    indicator: {
      control: "object",
      description: "a JSX element to render as the indicator in avatar",
    },
    customNode: {
      control: "object",
    },
    name: {
      control: "text",
      description:
        "name of the entity that has to shown with initials in the avatar",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
      description: "control to handle the size of the widget",
    },
  },
  args: {
    image:
      "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80",
    name: "",
    size: "md",
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};

export const WithInitials: Story = {
  args: {
    image: "",
    name: "Ramon James",
  },
};

export const WithIndicator: Story = {
  args: {
    indicator: <Indicator />,
  },
};

export const WithVerifiedTick: Story = {
  args: {
    indicator: <VerifiedTick />,
  },
};

export const WithCustomNode: Story = {
  args: {
    image: "",
    name: "",
    customNode: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
          stroke="#717680"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    indicator: <Indicator />,
  },
};
