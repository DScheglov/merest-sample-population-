'use strict';

module.exports = exports = Object.assign(
  { host: 'localhost' },
  require_safe('./host.json'),
  {
    port: 8083,
    apiPath: '/api/v1',
    db: 'mongodb://mongodb-server/merest-sample'
  }
);

function require_safe(modulePath) {
  try {
    return require(modulePath)
  } catch(e) {
    return null;
  };
}
