import * as React from "react";
import { observer } from "mobx-react";

import AppStore from "app/stores/AppStore";
import Button from "app/controls/Button";

const styles = (require("./styles.css") as any);

interface IProps {
  appStore: AppStore;
}

@observer
class HomePage extends React.Component<IProps, {}> {
  public handleReset = () => {
    this.props.appStore.resetTimer();
  }

  public render() {
    const { appStore } = this.props;

    return (
      <div className={styles.main}>
        <Button onClick={this.handleReset}>
          Seconds passed: {appStore.timer}
        </Button>
      </div>
    );
  }
}

export default HomePage;
