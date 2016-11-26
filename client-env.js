const _ = require('lodash');
const unflatten = require('unflatten');

const CLIENT_ENV_LIST = process.env.CLIENT_ENV_LIST || '';

const clientEnv = unflatten(_.pick(process.env, CLIENT_ENV_LIST.split(',')), {
  objectMode: true,
  separator: '__',
});

module.exports = clientEnv;
