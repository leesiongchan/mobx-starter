import { observable } from "mobx";

export class AppState {
  @observable
  public timer = 0;

  constructor() {
    setInterval(() => {
      this.timer += 1;
    }, 1000);
  }

  public resetTimer() {
    this.timer = 0;
  }
}

export default AppState;
