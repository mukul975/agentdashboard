/**
 * useCounterAnimation Hook
 *
 * Smoothly animates number changes with easing
 * Perfect for stat counters, progress indicators, and real-time data updates
 *
 * @param {number} targetValue - The target number to animate to
 * @param {number} duration - Animation duration in milliseconds (default: 600ms)
 * @returns {number} - The current animated display value
 *
 * @example
 * const animatedCount = useCounterAnimation(stats.totalTasks, 600);
 * return <span>{animatedCount}</span>;
 */

import { useEffect, useState, useRef } from 'react';

export function useCounterAnimation(targetValue, duration = 600) {
  const [displayValue, setDisplayValue] = useState(targetValue);
  const prevValueRef = useRef(targetValue);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    // Skip animation if target value is the same
    if (targetValue === prevValueRef.current) {
      return;
    }

    const startValue = prevValueRef.current;
    const difference = targetValue - startValue;
    const startTime = performance.now();

    // Cancel any ongoing animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for smooth deceleration
      // Formula: 1 - (1 - x)^3
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);

      // Calculate current value
      const current = Math.round(startValue + difference * easeOutCubic);

      setDisplayValue(current);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete - update ref
        prevValueRef.current = targetValue;
        animationFrameRef.current = null;
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetValue, duration]);

  return displayValue;
}

/**
 * useCounterAnimationWithHighlight Hook
 *
 * Same as useCounterAnimation but also returns whether value increased/decreased
 * Useful for applying visual highlights when values change
 *
 * @param {number} targetValue - The target number to animate to
 * @param {number} duration - Animation duration in milliseconds (default: 600ms)
 * @returns {object} - { value, isIncreasing, isDecreasing, hasChanged }
 *
 * @example
 * const { value, isIncreasing } = useCounterAnimationWithHighlight(stats.totalTasks);
 * return <span className={isIncreasing ? 'counter-increased' : ''}>{value}</span>;
 */

export function useCounterAnimationWithHighlight(targetValue, duration = 600) {
  const [displayValue, setDisplayValue] = useState(targetValue);
  const [changeDirection, setChangeDirection] = useState(null); // 'increase', 'decrease', or null
  const prevValueRef = useRef(targetValue);
  const animationFrameRef = useRef(null);
  const resetTimeoutRef = useRef(null);

  useEffect(() => {
    if (targetValue === prevValueRef.current) {
      return;
    }

    const startValue = prevValueRef.current;
    const difference = targetValue - startValue;
    const startTime = performance.now();

    // Determine direction
    setChangeDirection(difference > 0 ? 'increase' : 'decrease');

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + difference * easeOutCubic);

      setDisplayValue(current);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        prevValueRef.current = targetValue;
        animationFrameRef.current = null;

        // Reset change direction after a delay
        resetTimeoutRef.current = setTimeout(() => setChangeDirection(null), 1000);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, [targetValue, duration]);

  return {
    value: displayValue,
    isIncreasing: changeDirection === 'increase',
    isDecreasing: changeDirection === 'decrease',
    hasChanged: changeDirection !== null
  };
}

/**
 * useStaggeredAnimation Hook
 *
 * Returns staggered delay for list items
 * Perfect for animating lists of cards, tasks, or activity items
 *
 * @param {number} index - Item index in the list
 * @param {number} delayIncrement - Delay between items in milliseconds (default: 60ms)
 * @returns {object} - { animationDelay: string }
 *
 * @example
 * const { animationDelay } = useStaggeredAnimation(index, 80);
 * return <div style={{ animationDelay }}>{item}</div>;
 */

export function useStaggeredAnimation(index, delayIncrement = 60) {
  const delay = index * delayIncrement;

  return {
    animationDelay: `${delay}ms`,
    style: {
      animationDelay: `${delay}ms`
    }
  };
}

/**
 * useAnimationObserver Hook
 *
 * Observes when element enters viewport and triggers animation
 * Perfect for lazy-loading animations on scroll
 *
 * @param {object} options - IntersectionObserver options
 * @returns {[ref, isVisible]} - Ref to attach to element and visibility state
 *
 * @example
 * const [ref, isVisible] = useAnimationObserver();
 * return <div ref={ref} className={isVisible ? 'animate-in' : ''}>{content}</div>;
 */

export function useAnimationObserver(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.1,
        ...options
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [hasAnimated, options]);

  return [elementRef, isVisible];
}
