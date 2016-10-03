import * as React from "react";

const styles = (require("./styles.css") as any);

class NotFoundPage extends React.Component<{}, {}> {
  public render() {
    return (
      <div className={styles.main}>
        404 Not Found.
      </div>
    );
  }
}

export default NotFoundPage;
