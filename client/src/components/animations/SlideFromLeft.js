import React from "react";
import { useTransition, animated } from "react-spring";

const SlideFromLeft = ({ state, children }) => {
  const transition = useTransition(state, {
    from: {
      x: -800,
      y: -800,
      opacity: 0,
      maxWidth: 0,
    },
    enter: {
      x: 0,
      y: 0,
      opacity: 1,
      maxWidth: 800,
    },
    leave: {
      x: -800,
      y: -400,
      opacity: 0,
      maxWidth: 0,
    },
  });

  return transition((style, item) => {
    return item ? <animated.div style={style}>{children}</animated.div> : "";
  });
};

export default SlideFromLeft;
