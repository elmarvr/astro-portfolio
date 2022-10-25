import anime, { AnimeInstanceParams } from "animejs";
import type { AnimeAnimParams } from "animejs";
import { inView } from "./inView";

const DEFAULT_TRANSITION = {
  duration: 1000,
  easing: "easeOutExpo",
};

type Target = NonNullable<AnimeAnimParams["targets"]>;

type Transition = {
  duration?: AnimeAnimParams["duration"];
  delay?: AnimeAnimParams["delay"];
  easing?: AnimeAnimParams["easing"];
};

export function setTransparent(targets: Target) {
  anime.set(targets, { opacity: 0 });
}

export function slideRight(targets: Target, transition?: Transition) {
  anime({
    targets,
    translateX: [-100, 0],
    opacity: [0, 1],
    ...DEFAULT_TRANSITION,
    ...transition,
  });
}

export function slideLeft(targets: Target, transition?: Transition) {
  anime({
    targets,
    translateX: [100, 0],
    opacity: [0, 1],
    ...DEFAULT_TRANSITION,
    ...transition,
  });
}

export function slideUp(targets: Target, transition?: Transition) {
  anime({
    targets,
    translateY: [100, 0],
    opacity: [0, 1],
    ...DEFAULT_TRANSITION,
    ...transition,
  });
}

export function slideDown(targets: Target, transition?: Transition) {
  anime({
    targets,
    translateY: [-100, 0],
    opacity: [0, 1],
    ...DEFAULT_TRANSITION,
    ...transition,
  });
}
