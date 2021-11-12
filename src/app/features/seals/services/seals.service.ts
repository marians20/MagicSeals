import { Injectable } from '@angular/core';
import { SealStrategy } from '../models/seal-strategy.enum';
import { Seal } from '../models/seal.model';

@Injectable({
  providedIn: 'root'
})
export class SealsService {

  constructor() { }

  public getSeal(statement: string, strategy: SealStrategy): Seal
  {
    const dict = [
      {
        strategy: SealStrategy.RemoveAllCharactersWithMultipleOccurences,
        method: ((words: string[]) => {
          return this.removeCharsWithMultipleOccurences(words.join('')).toUpperCase();
        })
      },
      {
        strategy: SealStrategy.RemoveAllAlreadyExistingCharacters,
        method: ((words: string[]) => {
          return this.getDistinctChars(words.join('')).toUpperCase();
        })
      },
      {
        strategy: SealStrategy.RemovePairs,
        method: ((words: string[]) => {
          return this.removeDuplicates(words.join('')).toUpperCase();
        })
      },
    ];

    const words = this.splitInWords(statement);
    const numericSeal = words.map(w => this.getNumericSeal(w)).join('')
    return {
      statement: this.splitInWords(statement).join(' '),
      literalSeal: dict[strategy].method(words),
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

  private getDistinctChars(value: string): string {
    let result: string = '';
    [...value].forEach((character) => {
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

    const result: string[] = [];
    let currentPosition = 0;
    do {
      const currentValue = value[currentPosition];
      const pairIndex = value.substr(currentPosition + 1).indexOf(currentValue);
      if (pairIndex >= 0) {
        const left = value.substr(currentPosition + 1, pairIndex);
        const right = value.length >= pairIndex + 2
            ? value.substr(currentPosition + pairIndex + 2)
            : '';

        value = `${left}${right}`;
        currentPosition = 0;
      }
      else {
        result.push(currentValue);
        currentPosition++;
      }
    } while (currentPosition < value.length);

    return result.join('');
  }

  private removeCharsWithMultipleOccurences(value: string): string {
    let result: string = '';
    [...value].forEach((character) => {
      if(this.getNrOfOcurrences(value, character) === 1) {
        result = `${result}${character}`;
      }
    });

    return result;
  }

  private isCharacter = (text: string): boolean => /^[a-zA-Z]+$/.test(text);

  private isDigit = (text: string): boolean => /^[0-9]+$/.test(text);

  private getNrOfOcurrences = (text: string, value: string): number =>
    text.split(value).length - 1;

  private getNumericValue(text: string): string {
    let myText = text;
    let a = 'A'.charCodeAt(0) - 1;
    const result: string[] = [];
    for (let i = 0; i < myText.length; i++) {
      if (this.isCharacter(myText)) {
        result.push(`${(myText[i].toUpperCase().charCodeAt(0) - a) % 10}`);
      }
      else if (this.isDigit(myText)) {
        result.push(`${myText[i]}`);
      }
    }

    return result.join('');
  }

  private colapseToSingleDigit(text: string): string {
    let result = 0;
    for (let i = 0; i < text.length; i++) {
      result += +text[i];
    }
    while (result > 9) {
      const strResult = result.toString();
      result = 0;
      for (let i = 0; i < strResult.length; i++) {
        result += +strResult[i];
      }
    }

    return result.toString();
  }

  private splitInWords = (text: string) =>
    this.fixDiacritics(text.toUpperCase())
      .replace(new RegExp('[!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~]', 'g'), ' ')
      .split(/\s+/g)
      .filter((w) => w != '');

  private fixDiacritics = (value: string) =>
  value
    .replace('Ă', 'A')
    .replace('Ș', 'S')
    .replace('Ț', 'T')
    .replace('Î', 'I')
    .replace('Â', 'A');
}
