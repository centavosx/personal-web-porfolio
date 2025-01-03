import TwClasses from "@/constants/tailwind";
import {
  ContentBreakpoints,
  ContentType,
  ResponsiveStyleProps,
} from "@/types/content";

class DynamicContent {
  private static createClassWithPrefix(className?: string, prefix?: string) {
    if (!className) return undefined;

    return `${!!prefix ? prefix + ":" : ""}${className}`;
  }

  private static getClasses(
    type: ContentType,
    style: ResponsiveStyleProps,
    breakpoint?: string
  ) {
    const {
      gap: currentGap,
      justify,
      alignItems,
      selfAlign,
      direction,
    } = style;

    const alignItemsClass = !!alignItems
      ? TwClasses.alignItems[alignItems]
      : undefined;
    const justifyClass = !!justify ? TwClasses.justify[justify] : undefined;
    const selfAlignClass = !!selfAlign
      ? TwClasses.selfAlign[selfAlign]
      : undefined;
    const flexClass = !!direction
      ? TwClasses.flexDirection[direction]
      : undefined;

    const flexWidthClass =
      direction === "column" || direction === "column-reversed"
        ? "w-full"
        : "w-auto";

    let gapClass = `gap-${currentGap ?? 8}`;

    switch (type) {
      case "bullet":
      case "numeric":
        gapClass = `gap-${currentGap ?? 1}`;
        break;
    }

    return {
      gapClass: this.createClassWithPrefix(gapClass, breakpoint)!,
      alignItemsClass: this.createClassWithPrefix(alignItemsClass, breakpoint),
      justifyClass: this.createClassWithPrefix(justifyClass, breakpoint),
      selfAlignClass: this.createClassWithPrefix(selfAlignClass, breakpoint),
      flexClass: this.createClassWithPrefix(flexClass, breakpoint),
      flexWidthClass: this.createClassWithPrefix(flexWidthClass, breakpoint),
    };
  }

  static generateResponsiveClassNames = (
    type: ContentType,
    style: ResponsiveStyleProps,
    currentBreakpoint: ContentBreakpoints
  ) => {
    let data = this.getClasses(type, style);

    for (const key of Object.keys(currentBreakpoint)) {
      const currentBreakpointData =
        currentBreakpoint[key as keyof ContentBreakpoints];

      if (!currentBreakpointData) continue;

      const breakpointClasses = this.getClasses(
        type,
        currentBreakpointData,
        key
      );

      data = Object.keys(data).reduce((accumulator, key) => {
        const currentKey = key as keyof typeof data;
        let currentDataKeyValue = data[currentKey];
        const breakpointClassValue = breakpointClasses[currentKey];

        if (!!breakpointClassValue) {
          currentDataKeyValue = `${
            !!currentDataKeyValue ? `${currentDataKeyValue} ` : ""
          }${breakpointClassValue}`;
        }

        accumulator[currentKey] = currentDataKeyValue!;
        return accumulator;
      }, {} as typeof data);
    }

    return data;
  };
}

export default DynamicContent;
