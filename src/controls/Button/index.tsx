import * as React from "react";

const styles = (require("./styles.css") as any);

class Button extends React.Component<{ onClick }, {}> {
  public render() {
    const { children, onClick } = this.props;

    return (
      <button className={styles.main} onClick={onClick}>{children}</button>
    );
  }
}

export default Button;
