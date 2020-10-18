export class PronRow {
  hira: string;
  kata: string;
  pronounce: string;
  pronounceAlt: string;
  constructor(hira: string, kata: string, pronounce: string, pronounceAlt: string = null){
    this.hira = hira;
    this.kata = kata;
    this.pronounce = pronounce;
    this.pronounceAlt = pronounceAlt;
  }
}
