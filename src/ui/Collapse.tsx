// type Transition = {
//   easing?: AnimeParams["easing"];
//   duration?: AnimeParams["duration"];
//   delay?: AnimeParams["delay"];
// };

import clsx from "clsx";
import { useEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";

interface CollapseProps extends React.HTMLAttributes<HTMLDivElement> {
  when?: boolean;

  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  // collapseTransition?: Transition;
  // expandTransition?: Transition;
}

const Collapse = (props: CollapseProps) => {
  const collapseRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  const [styles, api] = useSpring(() => ({
    height: 0,
    immediate: true,
  }));

  useEffect(() => {
    if (props.when) {
      api.start({
        height: measureRef.current?.offsetHeight,
      });

      return;
    }

    api.start({
      height: 0,
    });
  }, [props.when]);

  return (
    <animated.div
      style={styles}
      ref={collapseRef}
      {...props.wrapperProps}
      className={clsx(props.wrapperProps?.className, "overflow-hidden")}
    >
      <div ref={measureRef} className={props.className}>
        {props.children}
      </div>
    </animated.div>
  );
};

export default Collapse;
