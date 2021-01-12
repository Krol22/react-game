import { useState, useCallback } from "react";

const useGsapAnimations = (nodeRef, animations = []) => {
  const [timeline, setTimeline] = useState(null);

  const playAnimation = useCallback((animationName, props) => {
    if (!animations[animationName]) {
      console.error(`No animation called ${animationName}`);
      return;
    }

    if (timeline) {
      // stop and remove previous animation if exists,
      timeline.restart();
      timeline.kill();
    }

    const newTimeline = animations[animationName](nodeRef, props);

    setTimeline(newTimeline);
  }, [animations, timeline, nodeRef]);

  return { playAnimation };
};

export default useGsapAnimations;
