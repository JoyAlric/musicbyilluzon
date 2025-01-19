'use client';

import { useEffect, useRef } from 'react';

export default function ProgressBar() {
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const progress = progressRef.current;

    if (!progress) return;

    // Constants for animation stages and timings
    const firstStageWidth = '18%'; // First stage: 0px to 70px
    const secondStageWidth = '60%'; // Second stage: 70px to 230px
    const thirdStageWidth = '78%'; // Third stage: 230px to 300px

    const firstDelay = 950;
    const firstTransitionTime = 600; // First stage duration
    const secondTransitionTime = 500; // Second stage duration
    const thirdTransitionTime = 600; // Third stage duration

    // Custom easing functions for smooth speed transitions
    const firstEasing = 'cubic-bezier(0.6, 0, 1, 1)'; // Accelerate towards the end
    const secondEasing = 'cubic-bezier(0, 0, 0.18, 1)'; // Decelerate towards the end
    const thirdEasing = 'ease-out'; // Smooth for the final transition

    // Apply initial style for seamless transitions
    progress.style.transition = 'none';
    progress.style.width = '0';

    // Sequential animations
    const timeouts: NodeJS.Timeout[] = [];

    timeouts.push(
      setTimeout(() => {
        progress.style.transition = `width ${firstTransitionTime}ms ${firstEasing}`;
        progress.style.width = firstStageWidth; // First stage
      }, firstDelay)
    );

    timeouts.push(
      setTimeout(() => {
        progress.style.transition = `width ${secondTransitionTime}ms ${secondEasing}`;
        progress.style.width = secondStageWidth; // Second stage
      }, firstDelay + firstTransitionTime)
    );

    timeouts.push(
      setTimeout(() => {
        progress.style.transition = `width ${thirdTransitionTime}ms ${thirdEasing}`;
        progress.style.width = thirdStageWidth; // Third stage
      }, firstDelay + firstTransitionTime + secondTransitionTime - 160)
    );

    // Cleanup on unmount
    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

  return (
    <div className="progress-bar">
      <div className="progress" ref={progressRef}></div>
    </div>
  );
}
