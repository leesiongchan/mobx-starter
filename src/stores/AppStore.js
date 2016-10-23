import { action, observable, runInAction } from 'mobx';

class AppStore {
  @observable timer = 0;

  constructor() {
    setInterval(() => {
      runInAction(() => {
        this.timer += 1;
      });
    }, 1000);
  }

  @action
  resetTimer() {
    this.timer = 0;
  }
}

export default AppStore;
