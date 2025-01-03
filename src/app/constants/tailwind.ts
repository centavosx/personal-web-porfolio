export class TwClasses {
  static get justify() {
    return {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
    } as const;
  }

  static get alignItems() {
    return {
      start: "items-start",
      center: "items-center",
      end: "items-end",
    };
  }

  static get selfAlign() {
    return {
      start: "self-start",
      center: "self-center",
      end: "self-end",
    } as const;
  }

  static get flexDirection() {
    return {
      column: "flex-col",
      "column-reversed": "flex-col-reverse",
      row: "flex-row",
      "row-reversed": "flex-row-reverse",
    };
  }
}

export default TwClasses;
