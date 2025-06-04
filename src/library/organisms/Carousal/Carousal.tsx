import React, {
  useState,
  useCallback,
  useRef,
  TouchEvent,
  MouseEvent,
} from "react";
import styles from "./Carousel.module.scss";

interface CarouselProps {
  children: React.ReactNode;
  /** Initial active slide index */
  initialIndex?: number;
  /** Minimum drag distance to trigger slide change (in pixels) */
  dragThreshold?: number;
  /** Animation duration in milliseconds */
  transitionDuration?: number;
  /** Whether to show indicator dots */
  showIndicators?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  initialIndex = 0,
  dragThreshold = 50,
  transitionDuration = 300,
  showIndicators = true,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(initialIndex);
  const [dragStart, setDragStart] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const items = React.Children.toArray(children);

  const next = useCallback(() => {
    setActiveIndex((current) => (current + 1) % items.length);
    setDragOffset(0);
  }, [items.length]);

  const prev = useCallback(() => {
    setActiveIndex((current) => (current - 1 + items.length) % items.length);
    setDragOffset(0);
  }, [items.length]);

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
    setDragOffset(0);
  }, []);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    e.preventDefault();
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const currentPosition = e.touches[0].clientX;
    const diff = currentPosition - dragStart;
    const containerWidth = containerRef.current?.offsetWidth || 0;

    // Adjust maxDrag to account for 80% width
    const maxDrag = containerWidth * 0.8;
    const boundedDiff = Math.max(Math.min(diff, maxDrag), -maxDrag);

    setDragOffset(boundedDiff);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const currentPosition = e.clientX;
    const diff = currentPosition - dragStart;
    const containerWidth = containerRef.current?.offsetWidth || 0;

    // Adjust maxDrag to account for 80% width
    const maxDrag = containerWidth * 0.8;
    const boundedDiff = Math.max(Math.min(diff, maxDrag), -maxDrag);

    setDragOffset(boundedDiff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    const containerWidth = containerRef.current?.offsetWidth || 0;
    const dragPercentage = (dragOffset / (containerWidth * 0.8)) * 100;

    if (
      Math.abs(dragPercentage) >
      (dragThreshold / (containerWidth * 0.8)) * 100
    ) {
      if (dragOffset > 0) {
        prev();
      } else {
        next();
      }
    }

    setIsDragging(false);
    setDragOffset(0);
  };

  const getTransform = (): string => {
    // Adjust transformation to account for 80% width and spacing
    const slideWidth = 80; // 80% width
    const baseTransform = -(activeIndex * slideWidth);
    const dragPercentage =
      (dragOffset / (containerRef.current?.offsetWidth || 1)) * 100;
    return `translateX(${baseTransform + dragPercentage}%)`;
  };

  const getTransitionDuration = (): string => {
    return isDragging ? "0ms" : `${transitionDuration}ms`;
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div
        className={styles.carouselTrack}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleDragEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <div
          className={`${styles.inner} ${isDragging ? styles.dragging : ""}`}
          style={{
            transform: getTransform(),
            transitionDuration: getTransitionDuration(),
          }}
        >
          {React.Children.map(children, (child) => (
            <div className={styles.slide}>{child}</div>
          ))}
        </div>
      </div>

      {showIndicators && (
        <div className={styles.indicators}>
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`${styles.dot} ${
                activeIndex === index ? styles.active : ""
              }`}
              aria-label={`Go to slide ${index + 1}`}
              type="button"
            >
              {activeIndex === index ? activeIndex + 1 : ""}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
