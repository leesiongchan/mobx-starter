declare module "react-hot-loader" {
  import React = require("react");

  interface AppContainerProps {
    children?: React.ReactElement<any>;
  }

  export class AppContainer extends React.Component<AppContainerProps, {}> {}
}
