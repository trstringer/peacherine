const assert = require('chai').assert;
const core = require('../src/core');
const config = require('./config');
const testUtil = require('./test-util');

describe('mysql querying', () => {
  it('should successfully return data', (done) => {
    const connectionOptions = testUtil.getConnectionBySourceType(config, 'mysql');

    const actionOptions = {
      query: 'SELECT * FROM information_schema.tables'
    };

    core.execute(connectionOptions, actionOptions, (err, results) => {
      if (err) {
        assert.fail(0, 1, `error querying mysql: ${err.message}`);
      }
      if (!results) {
        assert.fail(0, 1, `expected results, but none were found`);
      }
      done();
    });
  });
});