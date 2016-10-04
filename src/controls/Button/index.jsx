import React, { Component, PropTypes } from 'react';

import styles from './styles.css';

class Button extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
  };

  render() {
    const { children, onClick } = this.props;

    return (
      <button className={styles.main} onClick={onClick}>{children}</button>
    );
  }
}

export default Button;
