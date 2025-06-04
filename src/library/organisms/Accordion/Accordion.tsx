import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import clsx from "clsx";
import styles from "./Accordion.module.scss";

export type AccordionItem = {
  id: string; // Unique identifier for the item
  trigger: string | React.ReactNode; // Title or trigger content
  content: string | React.ReactNode; // Content of the accordion
};

export type AccordionProps = {
  items: AccordionItem[]; // Array of accordion items
  type?: "single" | "multiple"; // Single or multiple open items
  defaultValue?: string | string[]; // Default open item(s)
  collapsible?: boolean; // Allow collapse of all items
  className?: string; // Additional class for the root element
};

const AccordionComponent: React.FC<AccordionProps> = ({
  items,
  type = "single",
  defaultValue,
  collapsible = true,
  className,
}) => {
  return (
    <Accordion.Root
      type={type as "single"}
      defaultValue={defaultValue as string}
      collapsible={collapsible}
      className={clsx(styles["ui-accordion"], className)}
    >
      {items.map((item) => (
        <Accordion.Item
          className={styles["ui-accordion__item"]}
          value={item.id}
          key={item.id}
        >
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className={styles["ui-accordion__header"]}>
    <Accordion.Trigger
      className={clsx(styles["ui-accordion__trigger"], className)}
      {...props}
      ref={forwardedRef}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className={styles["ui-accordion__trigger__icon"]}
      >
        <path
          d="M6 12L10 8L6 4"
          stroke="#4F5262"
          stroke-width="1.3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>{" "}
      {children}
    </Accordion.Trigger>
  </Accordion.Header>
));

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={clsx(styles["ui-accordion__content"], className)}
    {...props}
    ref={forwardedRef}
  >
    <div className={styles["ui-accordion__content__text"]}>{children}</div>
  </Accordion.Content>
));

export default AccordionComponent;
