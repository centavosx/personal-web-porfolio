export const extendClassByProp = (
  prop: object & { className?: string },
  ...classes: string[]
) => {
  const classProp = prop.className;
  return {
    ...prop,
    className: [...classes, ...(classProp ? [classProp] : [])]
      .filter(Boolean)
      .join(" ")
      .trim(),
  };
};
