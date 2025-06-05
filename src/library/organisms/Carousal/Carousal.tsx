// Carousel.tsx
import React, { useState, ReactNode } from "react";
import { motion, useMotionValue } from "framer-motion";
import { times } from "lodash";
import styles from "./Carousel.module.scss";

interface CarouselProps {
  children: ReactNode[];
  snapBuffer?: number;
}

const Carousel: React.FC<CarouselProps> = ({ children, snapBuffer = 50 }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const dragX = useMotionValue(0);

  const handleDragEnd = () => {
    const draggedValue = dragX.get();
    if (draggedValue <= -snapBuffer && activeIndex < children.length - 1) {
      setActiveIndex((prev) => prev + 1);
    } else if (draggedValue >= snapBuffer && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const springTransition = {
    damping: 50,
    type: "spring",
    mass: 3,
    stiffness: 400,
  };

  return (
    <div className={styles.carousel}>
      <motion.div
        className={styles.track}
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${activeIndex * 100}%`,
        }}
        transition={springTransition}
        onDragEnd={handleDragEnd}
      >
        {children.map((child, index) => (
          <motion.div
            key={index}
            className={styles.slide}
            animate={{
              scale: activeIndex === index ? 1 : 0.95,
            }}
            transition={springTransition}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>

      {children.length > 1 && (
        <div className={styles.indicators}>
          {times(children.length, (index) => (
            <motion.button
              key={index}
              className={`${styles.indicator} ${
                activeIndex === index ? styles["indicator--active"] : ""
              }`}
              whileTap={{
                scale: 0.9,
              }}
              whileHover={{
                scale: 1.1,
              }}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              {activeIndex === index ? index + 1 : ""}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
