const assert = require('chai').assert;
const core = require('../src/core');
const config = require('./config');
const configUtil = require('./config-util');

describe('querying', () => {
  it('should return data when querying mssql', (done) => {
    const connectionOptions = configUtil.getConnectionBySourceType(config, 'mssql');

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
    const connectionOptions = configUtil.getConnectionBySourceType(config, 'documentdb');

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

  it('should create document in documentdb', (done) => {
    const connectionOptions = configUtil.getConnectionBySourceType(config, 'documentdb');

    const queryOptions = {
      operation: 'createDocument',
      collection: 'testcollection01',
      document: {
        id: "3",
        message: "test document creation"
      }
    };

    core.query(connectionOptions, queryOptions, (err, results) => {
      if (err !== undefined && err !== null) {
        assert.fail(0, 1, `error while inserting document in documentdb: ${err.message}`);
      }
      done();
    });
  });
});