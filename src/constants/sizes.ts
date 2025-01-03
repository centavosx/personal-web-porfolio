export class ImageSizes {
  static get icon() {
    return {
      xs: {
        height: 28,
        width: 28,
      },
      sm: {
        height: 36,
        width: 36,
      },
      md: {
        height: 48,
        width: 48,
      },
      lg: {
        height: 56,
        width: 56,
      },
      xl: {
        height: 72,
        width: 72,
      },
      xxl: {
        height: 108,
        width: 108,
      },
    } as const;
  }

  static get portrait() {
    return {
      xs: {
        height: 200,
        width: 150,
      },
      sm: {
        height: 256,
        width: 192,
      },
      md: {
        height: 320,
        width: 240,
      },
      lg: {
        height: 384,
        width: 288,
      },
      xl: {
        height: 512,
        width: 384,
      },
      xxl: {
        height: 640,
        width: 480,
      },
    } as const;
  }

  static get landscape() {
    return {
      xs: {
        height: 210,
        width: 375,
      },
      sm: {
        height: 324,
        width: 576,
      },
      md: {
        height: 432,
        width: 768,
      },
      lg: {
        height: 558,
        width: 992,
      },
      xl: {
        height: 675,
        width: 1200,
      },
      xxl: {
        height: 787,
        width: 1400,
      },
    } as const;
  }
}
