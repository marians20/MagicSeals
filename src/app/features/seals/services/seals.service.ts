import { Injectable } from '@angular/core';
import { Seal } from '../models/seal.model';

@Injectable({
  providedIn: 'root'
})
export class SealsService {

  constructor() { }

  public getSeal(statement: string): Seal
  {
    const words = this.splitInWords(statement);
    const numericSeal = words.map(w => this.getNumericSeal(w)).join('')
    return {
      statement: this.splitInWords(statement).join(' '),
      literalSeal: this.removeDuplicates(words.join('')).toUpperCase(),
      numericSeal,
      condensedNumericSeal: this.colapseToSingleDigit(numericSeal)
    }
  }

  private getNumericSeal(text: string): string {
    var words = this.splitInWords(text);
    var result: string[] = [];
    words.forEach((word) => {
      var nr = this.getNumericValue(word);
      var collapsedNr = this.colapseToSingleDigit(nr);
      result.push(collapsedNr);
    });

    return result.join('');
  }

  private getDistinctChars(text: string): string {
    let result: string = '';
    [...this.removeSpaces(text)].forEach((character) => {
      if (result.indexOf(character) === -1) {
        result = `${result}${character}`;
      }
    });

    return result;
  }

  private removeDuplicates(value: string): string {
    if (value == undefined || value === '' || value.length <= 1) {
      return value;
    }

    value = this.removeSpaces(value);
    var result: string[] = [];
    var currentPosition = 0;
    do {
      var currentValue = value[currentPosition];
      var pairIndex = value.substr(currentPosition + 1).indexOf(currentValue);
      if (pairIndex >= 0) {
        var left = value.substr(currentPosition + 1, pairIndex);
        var right =
          value.length >= pairIndex + 2
            ? value.substr(currentPosition + pairIndex + 2)
            : '';
        value = `${left}${right}`;
        currentPosition = 0;
      } else {
        result.push(currentValue);
        currentPosition++;
      }
    } while (currentPosition < value.length);
    return result.join('');
  }

  private removeSpaces = (text: string): string => this.splitInWords(text).join('');

  private isCharacter = (text: string): boolean => /^[a-zA-Z]+$/.test(text);

  private isDigit = (text: string): boolean => /^[0-9]+$/.test(text);

  private getNrOfOcurrences = (text: string, value: string): number =>
    text.split(value).length - 1;

    private getNumericValue(text: string): string {
    var myText = text;
    var a = 'A'.charCodeAt(0) - 1;
    var result: string[] = [];
    for (var i = 0; i < myText.length; i++) {
      if (this.isCharacter(myText)) {
        result.push(`${(myText[i].toUpperCase().charCodeAt(0) - a) % 10}`);
      } else if (this.isDigit(myText)) {
        result.push(`${myText[i]}`);
      }
    }

    return result.join('');
  }

  private colapseToSingleDigit(text: string): string {
    var result = 0;
    for (var i = 0; i < text.length; i++) {
      result += +text[i];
    }
    while (result > 9) {
      var strResult = result.toString();
      result = 0;
      for (var i = 0; i < strResult.length; i++) {
        result += +strResult[i];
      }
    }

    return result.toString();
  }

  splitInWords(text: string): string[] {
    var punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
    var regex = new RegExp('[' + punctuation + ']', 'g');
    return text
      .replace(regex, ' ')
      .split(/\s+/g)
      .filter((w) => w != '');
  }
}
