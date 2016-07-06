const assert = require('chai').assert;
const core = require('../src/core');
const config = require('./config');

describe('querying', () => {
  it('should return data when querying mssql', (done) => {
    const connectionOptions = config.connections.filter(
      (connection) => connection.dataSourceType === 'mssql'
    )[0];

    const queryOptions = {
      query: 'SELECT object_id, name FROM sys.objects'
    };

    core.query(connectionOptions, queryOptions, (err, results, rowsAffected) => {
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

  it('should return data when querying documentdb', (done) => {
    const connectionOptions = config.connections.filter(
      (connection) => connection.dataSourceType === 'documentdb'
    )[0];

    const queryOptions = {
      query: 'SELECT * FROM c',
      collection: 'testcollection01'
    };

    core.query(connectionOptions, queryOptions, (err, results) => {
      if (err !== undefined && err !== null) {
        assert.fail(0, 1, `error returned querying documentdb: ${err.message}`);
      }
      done();
    });
  });
});