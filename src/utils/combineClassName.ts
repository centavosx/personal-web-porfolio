export const combineClassName = (...classes: string[]) => {
  return [...new Set(classes.filter(Boolean)).values()].join(" ").trim();
};
