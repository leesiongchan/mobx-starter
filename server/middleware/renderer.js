import _ from 'lodash';

function renderer(view, locals) {
  return function* () {
    const CLIENT_ENV_LIST = process.env.CLIENT_ENV_LIST || '';
    const webpackAssets = require('../../webpack-assets.json');
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
