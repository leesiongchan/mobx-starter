import _ from 'lodash';
import unflatten from 'unflatten';

function renderer(view, locals) {
  return function* () {
    const CLIENT_ENV_LIST = process.env.CLIENT_ENV_LIST || '';
    const clientEnv = unflatten(_.pick(process.env, CLIENT_ENV_LIST.split(',')), {
      objectMode: true,
      separator: '__',
    });
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
        env: JSON.stringify(clientEnv),
      },
    };

    yield this.render(view, newLocals);
  };
}

export default renderer;
