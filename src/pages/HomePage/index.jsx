import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';

import Button from 'app/controls/Button';
import styles from './styles.css';

@observer
class HomePage extends Component {
  static propTypes = {
    appStore: PropTypes.object.isRequired,
  };

  handleReset = () => {
    this.props.appStore.resetTimer();
  }

  render() {
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
