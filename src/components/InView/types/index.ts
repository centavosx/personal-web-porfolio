import InViewAnimation from "../constants";

export type DefaultInViewComponentProps = {
  animate?: keyof typeof InViewAnimation;
  delay?: number;
  inViewClassName?: string;
};
