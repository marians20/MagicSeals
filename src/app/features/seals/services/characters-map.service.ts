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

  getCirclesRadiuses(zoomRatio: number): number[] {
    const result: number[] = [];
    for(let i = 1; i <= this.circleBorders.length; i++) {
      const radius = 2 * i / 6;
      result.push(radius * zoomRatio);
    }

    return result;
  }

  getPoints = (sigil: string, zoomRatio: number) =>
   this.getPolarCoordinates(sigil, zoomRatio)
    .map(point => point.toCartezian())
    .map(p => p.translate(zoomRatio, zoomRatio));

  getAllCharacters(): string {
    return this.range(this.ascii('A'), this.ascii('Z'))
      .map(code => this.char(code)).join('');
  }

  private getPolarCoordinates(sigil: string, zoomRatio: number): PolarPoint[]{
    if(! sigil) {
      return [];
    }
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
      (doubleCirclesCount - (2 * circleIndex) - 1) / doubleCirclesCount
    );
  }

  private getCircles(circleBorders: string[]): number[][] {
    const circlesBordersCodes = circleBorders.map(c => this.ascii(c));
    const circles = [this.range(this.ascii('A'), circlesBordersCodes[0] - 1)];

    for(let i = 0; i < circlesBordersCodes.length; i++) {
      circles.push(this.range(
        circlesBordersCodes[i],
        i < circlesBordersCodes.length - 1
          ? circlesBordersCodes[i + 1] - 1
          : this.ascii('Z')
        ));
    }

    console.log(circles);
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

  private char = (charCode: number) => String.fromCharCode(charCode);

  private range(from: number, to: number): number[] {
    const result: number[] = [];
    for(let i = from; i <= to; i++) {
      result.push(i);
    }

    return result;
  }
}
