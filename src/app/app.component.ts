import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hiragana-game-v1';
  readonly maxTimeLeftMs = 5000;
  readonly intervalTimeMs = 100;
  timeLeftPercent = 100;
  readonly maxLenTimeLeftCss = 500;
  timeLeftPercentCss = '0px';
  alerted = false;
  updateTime(): void{
    if (this.timeLeftPercent <= 0) {
      if (!this.alerted) {
        alert('Game Over!');
        this.alerted = true;
      }
    } else {
      this.timeLeftPercent -= 100 * this.intervalTimeMs / this.maxTimeLeftMs;
      this.timeLeftPercentCss = Math.round(this.maxLenTimeLeftCss * this.timeLeftPercent / 100) + 'px';
    }
  }
  ngOnInit(): void{
    setInterval(() => {
      this.updateTime();
    }, this.intervalTimeMs);
  }
}
