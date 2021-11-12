import { Point } from "./point";

export class Segment {
  constructor(
    public readonly p1: Point,
    public readonly p2: Point
  ) {}

  public get alpha(): number {
    return Math.atan((this.p2.y - this.p1.y) / (this.p2.x - this.p1.x));
  }
}
