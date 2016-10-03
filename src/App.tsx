import * as React from "react";
import DevTools from "mobx-react-devtools";

import AppStore from "./stores/AppStore";

const appStore =  new AppStore();

interface IProps {
}

class App extends React.Component<IProps, {}> {
  public render() {
    const { children } = this.props;
    const ChildNode = React.cloneElement((children as React.ReactElement<any>), {
      appStore,
    });

    return (
      <div>
        {ChildNode}

        {config.NODE_ENV === "development" &&
          <DevTools />
        }
      </div>
    );
  }
};

export default App;
