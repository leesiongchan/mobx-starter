import React, { Component, PropTypes } from 'react';
import DevTools from 'mobx-react-devtools';

import AppStore from './stores/AppStore';
import config from 'config';

const appStore = new AppStore();

class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children } = this.props;

    return (
      <div>
        {React.cloneElement(children, {
          appStore,
        })}

        {config.NODE_ENV === 'development' &&
          <DevTools />
        }
      </div>
    );
  }
}

export default App;
