import {Component, OnInit} from '@angular/core';
import {PronRow} from './PronRow';
import {HIRADB} from './hiraganaDB';

interface WrongAnsCount {
  hira: string;
  wrongCount: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hiragana-game-v1';
  isGameOver = false;
  readonly allowAltPron = true;
  readonly maxTimeLeftMs = 3000;
  readonly intervalTimeMs = 100;
  timeLeftPercent = 100;
  resetTimeLeftPercent(): void {
    this.timeLeftPercent = 100;
  }
  readonly maxLenTimeLeftCssNum = 500;
  timeLeftPercentCss = '0px';
  alerted = false;
  answerInputElm: HTMLInputElement = null;
  score = -1;
  updateTime(): void{
    if (this.timeLeftPercent <= 0) {
      this.isGameOver = true;
      setTimeout(() => {
        if (!this.alerted) {
          alert(this.hiraEntry.hira + ' : ' + this.hiraEntry.pronounce);
          this.alerted = true;
          this.saveWrongAnswer();
          this.saveHighScore();
          setTimeout(() => {
            window.location.reload();
          }, 100);
        }
      }, 100);
    } else {
      this.timeLeftPercent -= 100 * this.intervalTimeMs / this.maxTimeLeftMs;
      this.timeLeftPercentCss = Math.round(this.maxLenTimeLeftCssNum * this.timeLeftPercent / 100) + 'px';
    }
  }
  ngOnInit(): void{
    this.loadWrongAnswer();
    this.loadHighScore();
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

  hiraEntry: PronRow = new PronRow('?', '?', '?');
  setRandomHiraText(): void {
    const HIRADB_LEN = HIRADB.length;
    this.hiraEntry = randomMemberOf(HIRADB);
  }
  warnWrongAnswer = false;
  checkAnswerInput(): void{
    const answerText = this.answerInputElm.value;
    const currentHiraPron = this.hiraEntry.pronounce;
    this.warnWrongAnswer = !(
      currentHiraPron.startsWith(answerText)
      || (this.allowAltPron && this.hiraEntry.pronounceAlt != null && this.hiraEntry.pronounceAlt.startsWith(answerText))
    );
    if (
      currentHiraPron === answerText
      || (this.allowAltPron && this.hiraEntry.pronounceAlt != null && this.hiraEntry.pronounceAlt === answerText)
    ) {
      this.nextQuestion();
    }
  }
  nextQuestion(): void {
    if (!this.isGameOver) {
      this.score++;
      this.answerInputElm.value = '';
      this.resetTimeLeftPercent();
      this.setRandomHiraText();
    }
  }
  // tslint:disable-next-line:variable-name
  readonly lsKey_wrongs = 'WRONGS';
  // tslint:disable-next-line:variable-name
  readonly lsKey_highscore = 'HIGHSCORE';
  saveWrongAnswer(): void {
    let lsVal = localStorage.getItem(this.lsKey_wrongs);
    if (lsVal == null) {
      lsVal = '{}';
    }
    const wrongs = JSON.parse(lsVal);
    let currentCount: number = Number(wrongs[this.hiraEntry.hira]);
    if (typeof currentCount !== 'number' || isNaN(currentCount)) {
      currentCount = 0;
    }
    wrongs[this.hiraEntry.hira] = currentCount + 1;
    localStorage.setItem(this.lsKey_wrongs, JSON.stringify(wrongs));
  }
  savedWrongAnswers: WrongAnsCount[] = [];
  readonly MAX_SHOW_WRONG_ANS = 10;
  loadWrongAnswer(): void {
    const lsVal = localStorage.getItem(this.lsKey_wrongs);
    const arr: WrongAnsCount[] = [];
    if (lsVal != null) {
      const wrongs = JSON.parse(lsVal);
      for (const hira in wrongs) {
        if (wrongs.hasOwnProperty(hira)) {
          const wrongCount = wrongs[hira];
          if (typeof wrongCount === 'number') {
            arr.push({hira, wrongCount});
          }
        }
      }
    }
    arr.sort((item1, item2) => {
      return -(item1.wrongCount - item2.wrongCount);
    });
    const newArr: WrongAnsCount[] = [];
    const pushCount = Math.min(this.MAX_SHOW_WRONG_ANS, arr.length);
    for (let i = 0; i < pushCount; i++){
      newArr.push(arr[i]);
    }
    this.savedWrongAnswers = newArr;
  }
  highScore = 0;
  loadHighScore(): void {
    const lsVal = localStorage.getItem(this.lsKey_highscore);
    let highScoreLoaded = Number(lsVal);
    if (typeof highScoreLoaded !== 'number' || isNaN(highScoreLoaded)) {
      highScoreLoaded = 0;
    }
    this.highScore = highScoreLoaded;
  }
  saveHighScore(): void {
    const lsVal = localStorage.getItem(this.lsKey_highscore);
    let highScoreLoaded = Number(lsVal);
    if (typeof highScoreLoaded !== 'number' || isNaN(highScoreLoaded)) {
      highScoreLoaded = 0;
    }
    if (this.score >= highScoreLoaded) {
      localStorage.setItem(this.lsKey_highscore, this.score + '');
    }
  }
}
function randomIntFromInterval(min, max): number { // min and max inclusive.
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomMemberOf<T>(array: T[]): T{
  return array[randomIntFromInterval(0, array.length - 1)];
}
