import { Injectable } from '@angular/core';

import { Lap } from './lap.model';

@Injectable()
export class StopwatchService {
  public laps: Lap[];

  private startAt: number;
  private lapTime: number;

  constructor() {
    this.reset();
  }

  public lap() {
    const timeMs = this.startAt ? this.lapTime + this.now() - this.startAt : this.lapTime;

    this.laps[this.laps.length - 1].stop(timeMs);
    this.laps.push(new Lap(timeMs));
  }

  public now() {
    return _now();
  }

  public reset() {
    this.startAt = 0;
    this.lapTime = 0;

    this.laps = new Array<Lap>();
    this.laps.push(new Lap(0));
  }

  public start() {
    this.startAt = this.startAt ? this.startAt : this.now();
  }

  public stop() {
    const timeMs = this.startAt ? this.lapTime + this.now() - this.startAt : this.lapTime;

    this.lapTime = timeMs;
    this.laps[this.laps.length - 1].stop(timeMs);

    this.startAt = 0;
  }

  public time() {
    return this.lapTime + (this.startAt ? this.now() - this.startAt : 0);
  }
}

function _now() {
  return (new Date()).getTime();
}
