import {Component, OnInit} from '@angular/core';
import {HIRADB, HiraRow} from './hiraganaDB';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hiragana-game-v1';
  readonly maxTimeLeftMs = 10000;
  readonly intervalTimeMs = 100;
  timeLeftPercent = 100;
  resetTimeLeftPercent(): void {
    this.timeLeftPercent = 100;
  }
  readonly maxLenTimeLeftCssNum = 500;
  timeLeftPercentCss = '0px';
  alerted = false;
  answerInputElm: HTMLInputElement = null;
  updateTime(): void{
    if (this.timeLeftPercent <= 0) {
      if (!this.alerted) {
        alert(':' + this.hiraEntry.pronounce);
        this.alerted = true;
      }
    } else {
      this.timeLeftPercent -= 100 * this.intervalTimeMs / this.maxTimeLeftMs;
      this.timeLeftPercentCss = Math.round(this.maxLenTimeLeftCssNum * this.timeLeftPercent / 100) + 'px';
    }
  }
  ngOnInit(): void{
    this.answerInputElm = document.querySelector('#eid_answerInput');
    // always focus.
    this.answerInputElm.focus();
    this.answerInputElm.onblur = () => {
      setTimeout(() => {
          this.answerInputElm.focus();
      });
    };
    setInterval(() => {
      this.updateTime();
    }, this.intervalTimeMs);
    this.nextQuestion();
  }

  hiraEntry: HiraRow = new HiraRow('?', '?');
  setRandomHiraText(): void {
    const HIRADB_LEN = HIRADB.length;
    this.hiraEntry = randomMemberOf(HIRADB);
  }
  warnWrongAnswer = false;
  checkAnswerInput(): void{
    const answerText = this.answerInputElm.value;
    const currentHiraPron = this.hiraEntry.pronounce;
    this.warnWrongAnswer = !currentHiraPron.startsWith(answerText);
    if (answerText === currentHiraPron) {
      this.nextQuestion();
    }
  }
  nextQuestion(): void {
    this.answerInputElm.value = '';
    this.resetTimeLeftPercent();
    this.setRandomHiraText();
  }
}
function randomIntFromInterval(min, max): number { // min and max inclusive.
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomMemberOf<T>(array: T[]): T{
  return array[randomIntFromInterval(0, array.length - 1)];
}
