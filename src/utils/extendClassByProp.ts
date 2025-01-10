import { combineClassName } from "./combineClassName";

export const extendClassByProp = (
  prop: object & { className?: string },
  ...classes: string[]
) => {
  const classProp = prop.className;

  return {
    ...prop,
    className: combineClassName(...classes, ...(classProp ? [classProp] : [])),
  };
};
