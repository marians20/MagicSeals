import { PolarPoint } from './polar-point';
export class Point {
  constructor(
    public readonly x: number,
    public readonly y: number
  ) { }

  toPolar(): PolarPoint {
    const alpha = Math.atan(this.x/this.y);
    return new PolarPoint(alpha, Math.sqrt(this.x * this.x + this.y * this.y));
  }

  translate = (deltaX: number, deltaY: number) =>
    new Point(this.x + deltaX, this.y + deltaY);
}
