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

  orbitSpeed!: number;
  orbitRadius!: number;

  r: number;
  g: number;
  b: number;

  blackHoleRadius = 50;

  posX = 0;
  posY = 0;
  opacity = 0.4;

  isInBlackHole = false;

  constructor(
    private context: CanvasRenderingContext2D,
    containerHeight: number,
    containerWidth: number,
    blackHoleRadius: number
  ) {
    this.alpha = Math.random() * 360 + 1;

    const color1 = colors[Math.floor(Math.random() * colors.length)];
    const color2 = colors[Math.floor(Math.random() * colors.length)];

    this.blackHoleRadius = blackHoleRadius;

    this.r = Math.floor((color1.r + color2.r) / 2);
    this.g = Math.floor((color1.g + color2.g) / 2);
    this.b = Math.floor((color1.b + color2.b) / 2);

    this.speed = (Math.random() * 100 < 50 ? 1 : -1) * 0.02;
    this.size = Math.random() * 2 + 1;

    this.updateContext(containerHeight, containerWidth, blackHoleRadius);
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

  move(
    mouseX: number,
    mouseY: number,
    blackHoleRadiusMultiplier = 1,
    hasMeetMax = false,
    onAddInBlackHole: () => void,
    onRemoveFromBlackhole: () => void
  ) {
    this.alpha += this.speed;
    this.posX = this.x + this.radX * Math.cos((this.alpha / 180) * Math.PI);
    this.posY =
      this.y +
      blackHoleRadiusMultiplier +
      this.radY * Math.sin((this.alpha / 180) * Math.PI);

    const currentMouseY = mouseY + blackHoleRadiusMultiplier;

    const mouseDrawX = this.posX - mouseX;
    const mouseDrawY = this.posY - currentMouseY;

    this.opacity = 0.4;

    const radius = Math.sqrt(mouseDrawX * mouseDrawX + mouseDrawY * mouseDrawY);

    const maxBlackholeRadius = this.blackHoleRadius * blackHoleRadiusMultiplier;

    const hasMeetBlackHoleRequirememnts =
      (hasMeetMax && this.isInBlackHole) || !hasMeetMax;

    if (radius < maxBlackholeRadius * 2) {
      this.opacity = 0;
      if (!hasMeetBlackHoleRequirememnts) return;

      const orbitRadius = this.orbitRadius * blackHoleRadiusMultiplier;
      this.posX = mouseX + orbitRadius * Math.cos(this.alpha * 8);
      this.posY = currentMouseY + orbitRadius * Math.sin(this.alpha * 8);
      this.opacity = 1;
      if (!this.isInBlackHole) onAddInBlackHole();
      this.isInBlackHole = true;
    }

    if (this.isInBlackHole) onRemoveFromBlackhole();
    this.isInBlackHole = false;
  }

  updateContext(
    containerHeight: number,
    containerWidth: number,
    blackHoleRadius: number
  ) {
    this.updateBlackHoleRadius(blackHoleRadius);

    this.width = containerWidth;
    this.height = containerHeight;
    this.x = containerWidth / 2;
    this.y = containerHeight / 2;

    this.radX = 2 * Math.random() * this.x + 1;
    this.radY = 1.2 * Math.random() * this.y + 1;

    this.orbitSpeed = 0.1 + Math.random() * 0.1;
    this.orbitRadius =
      this.blackHoleRadius - 1 + Math.random() * this.blackHoleRadius;
  }

  updateBlackHoleRadius(blackHoleRadius: number) {
    this.blackHoleRadius = blackHoleRadius;
  }
}
