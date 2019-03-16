import { Component } from '@angular/core';

import { StopwatchService } from './stopwatch-svc';

@Component({
  selector: 'clock',
  styles: [`
      .container {
        background-color: #ecf0f1;
        font-family: 'Roboto', sans-serif;
        margin: 1em auto 1em auto;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        -ms-border-radius: 8px;
        -o-border-radius: 8px;
        border-radius: 8px;
        padding-top: 1.5em;
        -webkit-box-shadow: #bdc3c7 0 5px 5px;
        -moz-box-shadow: #bdc3c7 0 5px 5px;
        box-shadow: #bdc3c7 0 5px 5px;
        min-height: 70vh;
    }

    .container h1 {
        text-align: center;
        font-weight: 500;
        font-size: 80px;
    }

    @media (min-width: 768px) {
      .container {
        width: 750px;
      }

      .container h1 {
        font-size: 150px;
      }
    }

    @media (min-width: 992px) {
      .container {
        width: 970px;
      }

      .container h1 {
        font-size: 200px;
      }
    }

    @media (min-width: 1200px) {
      .container {
        width: 1170px;
      }
    }

    .btn-group {
        font-size: 0;
        line-height: 1;
        white-space: nowrap;
        display: inline;
    }

    .btn-group button {
        width: 33%;
        text-decoration: none;
        text-transform: uppercase;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 40px;
        background: #000;
        color: #fff;
        border: 1px solid #bdc3c7;
        border-left-width: 0;
        display: inline-block;
        padding: 0.25em 1.25em;
        outline: 0;
    }

    .btn-group button:last-child {
        border-right-width: 0;
        width: 34%;
    }

    .btn-group button:first-child {
        border-radius: 0 0 0 8px;
    }

    .btn-group button:last-child {
        border-radius: 0 0 8px 0;
    }

    .btn-group button:active {
        background: transparent;
        color: #4d4d4d;
    }

    .laps {
        padding: 10px;
        background: #006341;
    }

    .lap {
        padding: 10px;
        display: flex;
        justify-content: space-around;
        color: white;
    }
  `],
  template: `
    <div class="container">
      <h1>{{ formatTime(time) }}</h1>
      <div class="btn-group">
        <button (click)="toggle()">
          <i class="fa"
            [ngClass]="{ 'fa-play': !started, 'fa-pause': started }">
          </i>
        </button>
        <button (click)="reset()"><i class="fa fa-refresh"></i></button>
        <button (click)="lap()">Split</button>
      </div>
      <div class="laps" *ngIf="stopwatchService.laps.length > 1">
        <div class="lap" *ngFor="let lap of stopwatchService.laps; let i = index; let last = last">
            <div>{{ i }}</div>
            <div>{{ formatTime(lap.startMs) }}</div>
            <div *ngIf="last">{{ formatTime(time) }}</div>
            <div *ngIf="!last">{{ formatTime(lap.endMs) }}</div>
        </div>
      </div>
    </div>
  `
})
export class ClockComponent {

  public stopwatchService: StopwatchService;

  public started: boolean = false;
  public time: number = 0;

  private timer: any;

  constructor(stopwatchService: StopwatchService) {
    this.stopwatchService = stopwatchService;
  }

  public formatTime(timeMs: number) {
    let minutes: string;
    let seconds: string;

    minutes = Math.floor(timeMs / 60000).toString();
    seconds = ((timeMs % 60000) / 1000).toFixed(3);

    return minutes + ':' + (+seconds < 10 ? '0' : '') + seconds;
  }

  public getUpdate() {
    const self = this;

    return () => {
      self.time = this.stopwatchService.time();
    };
  }

  public lap() {
    this.update();

    if (this.time) {
      this.stopwatchService.lap();
    }
  }

  public reset() {
    this.stopwatchService.reset();
    this.started = false;
    this.update();
  }

  public start() {
    this.timer = setInterval(this.getUpdate(), 1);
    this.stopwatchService.start();
  }

  public stop() {
    clearInterval(this.timer);
    this.stopwatchService.stop();
  }

  public toggle() {
    if (this.started) {
        this.stop();
    } else {
        this.start();
    }

    this.started = !this.started;
  }

  public update() {
    this.time = this.stopwatchService.time();
  }
}
