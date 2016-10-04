import React, { Component, PropTypes } from 'react';

import styles from './styles.css';

class NotFoundPage extends Component {
  static propTypes = {
  };

  render() {
    return (
      <div className={styles.main}>
        404 Not Found.
      </div>
    );
  }
}

export default NotFoundPage;
