import { Star } from "./star";

export class Space {
  width!: number;
  height!: number;

  stars: Star[] = [];

  constructor(public context: CanvasRenderingContext2D) {}

  getMaxDistance() {
    if (this.width < 480) return 30;
    if (this.width < 1280) return 40;
    return 50;
  }

  getNumberOfStars() {
    if (this.width < 480) return 300;
    if (this.width < 1280) return 600;
    return 800;
  }

  moveAndDrawStars() {
    this.context.fillStyle = "#000000";
    this.context.fillRect(0, 0, this.width, this.height);

    for (const star of this.stars) {
      star.move();
      star.draw();
    }
  }

  generateStars(height: number, width: number) {
    this.width = width;
    this.height = height;

    const newStars: Star[] = [];
    const numberOfStars = this.getNumberOfStars();

    for (let i = 0; i < numberOfStars; i++) {
      const star = new Star(this.context, this.height, this.width);
      newStars.push(star);
    }

    this.stars = newStars;
  }
}
