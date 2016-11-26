import clientEnv from '../../client-env';

function renderer(view, locals) {
  return function* () {
    let webpackAssets = {};

    try {
      webpackAssets = require('../../webpack-assets.json');
    } catch (err) {
      console.log('webpack-assets.json is not ready.');
    }

    const newLocals = {
      ...webpackAssets,
      ...locals,
      env: clientEnv,
    };

    yield this.render(view, newLocals);
  };
}

export default renderer;
