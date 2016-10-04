import React from 'react';
import { Router as BaseRouter } from 'react-router';

// Hacky workaround to make react-hot-loader to work properly with react-router.
// @reference https://github.com/gaearon/react-hot-boilerplate/pull/61#issuecomment-211504531
class Router extends BaseRouter {
  componentWillReceiveProps(nextProps) {
    const components = [];

    function grabComponents(element) {
      // This only works for JSX routes, adjust accordingly for plain JS config
      if (element.props && element.props.component) {
        components.push(element.props.component);
      }

      if (element.props && element.props.children) {
        React.Children.forEach(element.props.children, grabComponents);
      }
    }

    grabComponents(nextProps.routes || nextProps.children);
    components.forEach(React.createElement); // force patching
  }
}

export default Router;
