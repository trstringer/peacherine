const assert = require('chai').assert;
const core = require('../src/core');
const config = require('./config');

describe('querying', () => {
  it('should return data when querying mssql', (done) => {
    const connectionOptions = config.connections.filter(
      (connection) => connection.dataSourceType === 'mssql')[0];

    const queryOptions = {
      query: 'select * from sys.objects'
    };

    core.query(connectionOptions, queryOptions, (err, recordset, rowsAffected) => {
      if (err !== undefined && err !== null) {
        assert.fail(0, 1, 'error returned when querying mssql');
      }
      assert.isNotNull(recordset);
      assert.isDefined(recordset);
      done();
    });
  });
});