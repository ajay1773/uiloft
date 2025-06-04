import { FC, ReactNode } from "react";
import { Drawer } from "vaul";
import styles from "./BottomSheet.module.scss";
import clsx from "clsx";

interface BottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: ReactNode;
  fullHeight?: boolean; // New prop to control full height
}

const BottomSheet: FC<BottomSheetProps> = ({
  open,
  onOpenChange,
  title,
  children,
  fullHeight = false,
}) => {
  const contentClassName = clsx(
    styles["bottom-sheet__content"],
    fullHeight ? styles["bottom-sheet__content--fullWidth"] : ""
  );
  return (
    <Drawer.Root open={open}>
      <Drawer.Portal>
        <Drawer.Overlay className={styles["bottom-sheet__overlay"]} />
        <Drawer.Content className={contentClassName}>
          <div className={styles["bottom-sheet__header"]}>
            {title && (
              <h2 className={styles["bottom-sheet__title"]}>{title}</h2>
            )}
            <button onClick={() => onOpenChange(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M17 7L7 17M7 7L17 17"
                  stroke="#535862"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
    // <Drawer.Root
    //   open={open}
    //   onOpenChange={onOpenChange}
    //   snapPoints={fullHeight ? [1] : [0.25, 0.5, 1]} // Full height if true, otherwise use snap points
    // >
    //   <Drawer.Trigger asChild>
    //     <button className={styles["bottom-sheet__trigger"]}>Open Sheet</button>
    //   </Drawer.Trigger>

    //   <Drawer.Overlay className={styles["bottom-sheet__overlay"]} />

    //   <Drawer.Content
    //     className={`${styles["bottom-sheet"]} ${
    //       fullHeight ? styles["bottom-sheet--full"] : ""
    //     }`}
    //   >
    //     <div className={styles["bottom-sheet__handle"]} />
    //     {title && <h2 className={styles["bottom-sheet__title"]}>{title}</h2>}
    //     <div className={styles["bottom-sheet__content"]}>{children}</div>
    //   </Drawer.Content>
    // </Drawer.Root>
  );
};

export default BottomSheet;
