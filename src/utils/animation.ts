import anime, { AnimeInstanceParams } from "animejs";
import type { AnimeAnimParams } from "animejs";
import { inView } from "./inView";

type AnimeAnimParamsWithoutTargets = {
  duration?: AnimeAnimParams["duration"];
  delay?: AnimeAnimParams["delay"];
  endDelay?: AnimeAnimParams["endDelay"];
  elasticity?: AnimeAnimParams["elasticity"];
  round?: AnimeAnimParams["round"];
  keyframes?: AnimeAnimParams["keyframes"];
  [AnyAnimatedProperty: string]: any;
};

type AnimeParamsWithoutTargets = AnimeAnimParamsWithoutTargets & AnimeInstanceParams;

export function animateInView(root: string, targets: string, params: AnimeParamsWithoutTargets): () => void;
export function animateInView(targets: string, params: AnimeParamsWithoutTargets): () => void;

export function animateInView(
  targetsOrRoot: string,
  targetsOrParams: AnimeParamsWithoutTargets | string,
  maybeParams?: AnimeParamsWithoutTargets
) {
  const params = typeof targetsOrParams === "string" ? maybeParams : targetsOrParams;
  const targets = typeof targetsOrParams === "string" ? targetsOrParams : targetsOrRoot;

  const animation = anime({
    targets,
    autoplay: false,
    ...params,
  });

  return inView(
    targetsOrRoot,
    () => {
      animation.play();
    },
    {
      amount: 0.5,
    }
  );
}
