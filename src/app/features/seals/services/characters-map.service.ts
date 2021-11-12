import { Injectable } from '@angular/core';
import { PolarPoint } from '../models/polar-point';

@Injectable({
  providedIn: 'root'
})
export class CharactersMapService {

private readonly circleBorders = ['N', 'V'];
private readonly circles: number[][];

  constructor() {
    this.circles = this.getCircles(this.circleBorders);
   }

  getPoints = (sigil: string, zoomRatio: number) =>
   this.getPolarCoordinates(sigil, zoomRatio).map(point => point.toCartezian());

  private getPolarCoordinates(sigil: string, zoomRatio: number): PolarPoint[]{
    return [...sigil].map(letter => this.getLetterPolarCoordinates(letter)?.zoom(zoomRatio))
      .filter(p => p !== undefined) as PolarPoint[];
  }

  private getLetterPolarCoordinates(letter: string): PolarPoint | null {
    const letterCode = this.ascii(letter);
    const circleIndex = this.getCircleIndex(letterCode);
    if(circleIndex < 0) {
      return null;
    }

    const circleLength = this.circles[circleIndex].length
    const indexInTheCircle = this.getIndexInTheCircle(letterCode, this.circles[circleIndex]);
    const doubleCirclesCount = this.circles.length * 2;
    return new PolarPoint(
      2 * Math.PI * indexInTheCircle/circleLength - Math.PI / 2 + Math.PI / circleLength,
      (doubleCirclesCount - circleIndex - 1) / doubleCirclesCount
    );
  }

  private getCircles(circleBorders: string[]) {
    const circlesBordersCodes = circleBorders.map(c => this.ascii(c));
    const circles = [this.range(this.ascii('A'), circlesBordersCodes[0])];
    for(let i = 0; i < circlesBordersCodes.length; i++) {
      circles.push(this.range(
        circlesBordersCodes[i],
        i < circlesBordersCodes.length - 1
          ? circlesBordersCodes[i + 1]
          : this.ascii('Z') + 1
        ));
    }
    return circles;
  }

  private getCircleIndex(letterCode: number): number {
    for(let i = 0; i < this.circles.length; i++) {
      if(this.circles[i].includes(letterCode)) {
        return i;
      }
    }

    return -1;
  }

  private getIndexInTheCircle(letterCode: number, circle: number[]) {
    return circle.indexOf(letterCode);
  }

  private ascii = (letter: string) => letter.charCodeAt(0);

  private range(from: number, to: number): number[] {
    const result: number[] = [];
    for(let i = from; i < to; i++) {
      result.push(i);
    }

    return result;
  }
}
