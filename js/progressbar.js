const progress = document.querySelector('.progress');


      // Constants for animation stages and timings
      const firstStageWidth = '18%';   // First stage: 0px to 70px
      const secondStageWidth = '60%'; // Second stage: 70px to 230px
      const thirdStageWidth = '78%';  // Third stage: 230px to 300px

      const firstdelay = 950;
      const firstTransitionTime = 600;  // First stage duration
      const secondTransitionTime = 500;  // Second stage duration
      const thirdTransitionTime = 600;  // Third stage duration

      // Custom easing functions for smooth speed transitions
      const firstEasing = 'cubic-bezier(0.6, 0, 1, 1)';  // Accelerate towards the end
      const secondEasing = 'cubic-bezier(0, 0, 0.18, 1)'; // Decelerate towards the end
      const thirdEasing = 'ease-out';                  // Smooth for the final transition

      // Apply initial style for seamless transitions
      progress.style.transition = 'none';
      progress.style.width = '0';

      // Sequential animations
      setTimeout(() => {
        progress.style.transition = `width ${firstTransitionTime}ms ${firstEasing}`;
        progress.style.width = firstStageWidth; // First stage
      }, firstdelay); // Immediate start

      setTimeout(() => {
        progress.style.transition = `width ${secondTransitionTime}ms ${secondEasing}`;
        progress.style.width = secondStageWidth; // Second stage
      }, firstdelay + firstTransitionTime); // Start after first stage finishes

      setTimeout(() => {
        progress.style.transition = `width ${thirdTransitionTime}ms ${thirdEasing}`;
        progress.style.width = thirdStageWidth; // Third stage
      }, firstdelay + firstTransitionTime + secondTransitionTime - 160); // Start after second stage finishes