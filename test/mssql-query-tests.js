const assert = require('chai').assert;
const core = require('../src/core');
const config = require('./config');
const testUtil = require('./test-util');

describe('mssql querying', () => {
  it('should return data when querying mssql', (done) => {
    const connectionOptions = testUtil.getConnectionBySourceType(config, 'mssql');

    const actionOptions = {
      query: 'SELECT object_id, name FROM sys.objects'
    };

    core.run(connectionOptions, actionOptions, (err, results, rowsAffected) => {
      if (err) {
        assert.fail(0, 1, 'error returned when querying mssql');
      }
      // we can't do any assertion on recordset (in case of DML) 
      // or rowsAffect, in the case of schema changes
      // the assumption here is that if no error was returned 
      // then the test was successful
      done();
    });
  });
});