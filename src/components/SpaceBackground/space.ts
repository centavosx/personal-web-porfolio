import { Star } from "./star";

export class Space {
  width!: number;
  height!: number;
  blackHoleRadiusMultiplier = 1;
  blackHoleCount = 0;
  maxStarCountInBlackhole = 150;

  mouseX = -100;
  mouseY = -100;

  stars: Star[] = [];

  constructor(public context: CanvasRenderingContext2D) {}

  getMaxDistance() {
    if (this.width < 480) return 30;
    if (this.width < 1280) return 50;
    return 60;
  }

  getNumberOfStars() {
    if (this.width < 480) return 400;
    if (this.width < 768) return 600;
    if (this.width < 976) return 800;
    if (this.width < 1280) return 1500;
    return 2500;
  }

  updateCursor(mouseX: number, mouseY: number) {
    this.mouseX = mouseX;
    this.mouseY = mouseY;
  }

  increaseBlackHoleRadius() {
    if (this.blackHoleRadiusMultiplier < 2) {
      this.blackHoleRadiusMultiplier += 0.1;
      this.maxStarCountInBlackhole += 3;
      return;
    }
  }

  decreaseBlackHoleRadius() {
    if (this.blackHoleRadiusMultiplier > 1) {
      this.blackHoleRadiusMultiplier -= 0.1;
      this.maxStarCountInBlackhole += 3;
      return;
    }
  }

  moveAndDrawStars() {
    this.context.fillStyle = "#000000";
    this.context.fillRect(0, 0, this.width, this.height);

    for (const star of this.stars) {
      star.move(
        this.mouseX,
        this.mouseY,
        this.blackHoleRadiusMultiplier,
        this.blackHoleCount >= this.maxStarCountInBlackhole,
        () => {
          this.blackHoleCount++;
        },
        () => {
          this.blackHoleCount--;
        }
      );
      star.draw();
    }
  }

  generateStars(height: number, width: number) {
    this.width = width;
    this.height = height;

    const newStars: Star[] = [];
    const numberOfStars = this.getNumberOfStars();

    for (let i = 0; i < numberOfStars; i++) {
      const star = new Star(
        this.context,
        this.height,
        this.width,
        this.getMaxDistance()
      );
      newStars.push(star);
    }

    this.stars = newStars;
  }
}
