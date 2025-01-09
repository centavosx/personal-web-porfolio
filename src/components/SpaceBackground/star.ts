const colors = [
  { r: 255, g: 255, b: 255 }, // White
  { r: 0, g: 0, b: 0 }, // Black
  { r: 0, g: 0, b: 255 },
];

export class Star {
  width!: number;
  height!: number;
  x!: number;
  y!: number;
  alpha: number;
  radX!: number;
  radY!: number;
  speed: number;
  size: number;

  r: number;
  g: number;
  b: number;

  posX = 0;
  posY = 0;
  opacity = 0.4;

  isInBlackHole = false;

  constructor(
    private context: CanvasRenderingContext2D,
    containerHeight: number,
    containerWidth: number
  ) {
    this.alpha = Math.random() * 360 + 1;

    const color1 = colors[Math.floor(Math.random() * colors.length)];
    const color2 = colors[Math.floor(Math.random() * colors.length)];

    this.r = Math.floor((color1.r + color2.r) / 2);
    this.g = Math.floor((color1.g + color2.g) / 2);
    this.b = Math.floor((color1.b + color2.b) / 2);

    this.speed = (Math.random() * 100 < 50 ? 1 : -1) * 0.02;
    this.size = Math.random() * 2 + 1;

    this.updateContext(containerHeight, containerWidth);
  }

  draw() {
    const color = `rgba(${this.r},${this.g},${this.b},${this.opacity})`;

    this.context.beginPath();
    this.context.fillStyle = color;
    this.context.arc(this.posX, this.posY, this.size, 0, Math.PI * 2, false);
    this.context.shadowColor = color;
    this.context.shadowBlur = 1;
    this.context.fill();
    this.context.closePath();
  }

  move() {
    this.alpha += this.speed;
    this.posX = this.x + this.radX * Math.cos((this.alpha / 180) * Math.PI);
    this.posY = this.y + this.radY * Math.sin((this.alpha / 180) * Math.PI);
  }

  updateContext(containerHeight: number, containerWidth: number) {
    this.width = containerWidth;
    this.height = containerHeight;
    this.x = containerWidth / 2;
    this.y = containerHeight / 2;

    this.radX = 2 * Math.random() * this.x + 1;
    this.radY = 1.2 * Math.random() * this.y + 1;
  }
}
