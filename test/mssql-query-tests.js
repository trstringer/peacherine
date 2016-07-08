const assert = require('chai').assert;
const core = require('../src/core');
const config = require('./config');
const configUtil = require('./config-util');

describe('mssql querying', () => {
  it('should return data when querying mssql', (done) => {
    const connectionOptions = configUtil.getConnectionBySourceType(config, 'mssql');

    const actionOptions = {
      query: 'SELECT object_id, name FROM sys.objects'
    };

    core.execute(connectionOptions, actionOptions, (err, results, rowsAffected) => {
      if (err !== undefined && err !== null) {
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