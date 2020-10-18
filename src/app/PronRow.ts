export class PronRow {
  char: string;
  pronounce: string;
  pronounceAlt: string;
  constructor(char: string, pronounce: string, pronounceAlt: string = null){
    this.char = char;
    this.pronounce = pronounce;
    this.pronounceAlt = pronounceAlt;
  }
}
