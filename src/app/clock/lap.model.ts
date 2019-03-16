export class Lap {
  public startMs: number;
  public endMs: number;

  constructor(startMs: number) {
    this.startMs = startMs;
    this.endMs = 0;
  }

  public stop(timeMs: number) {
    this.endMs = timeMs;
  }
}
