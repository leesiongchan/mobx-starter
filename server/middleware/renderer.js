import _ from 'lodash';

function renderer(view, locals) {
  return function* () {
    const CLIENT_ENV_LIST = process.env.CLIENT_ENV_LIST || '';
    let webpackAssets = {};

    try {
      webpackAssets = require('../../webpack-assets.json');
    } catch (err) {
      console.log('webpack-assets.json is not ready.');
    }

    const newLocals = {
      ...webpackAssets,
      ...locals,
      env: process.env.NODE_ENV,
      window: {
        env: JSON.stringify(_.pick(process.env, CLIENT_ENV_LIST.split(','))),
      },
    };

    yield this.render(view, newLocals);
  };
}

export default renderer;
