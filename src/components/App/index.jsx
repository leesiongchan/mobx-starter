import React, { Component, PropTypes } from 'react';
import DevTools from 'mobx-react-devtools';

import config from 'config';
import styles from './styles.css';

class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children, ...props } = this.props;

    return (
      <div className={styles.main}>
        <main className={styles.content}>
          {React.cloneElement(children, props)}
        </main>

        {config.NODE_ENV === 'development' &&
          <DevTools />
        }
      </div>
    );
  }
}

export default App;
