import { Point } from './point';
export class PolarPoint {
  constructor(
  public readonly alpha: number,
  public readonly radius: number
  ) { }

  public toCartezian(): Point {
    return new Point(
      this.radius * Math.cos(this.alpha),
      this.radius * Math.sin(this.alpha)
      );
  }

  public zoom(ratio: number): PolarPoint {
    return new PolarPoint(this.alpha, this.radius * ratio);
  }
}
