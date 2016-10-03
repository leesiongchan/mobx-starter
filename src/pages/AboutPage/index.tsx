import * as React from "react";

const styles = (require("./styles.css") as any);

class AboutPage extends React.Component<{}, {}> {
  public render() {
    return (
      <div className={styles.main}>
        About Page
      </div>
    );
  }
}

export default AboutPage;
