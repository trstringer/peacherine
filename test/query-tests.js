const assert = require('chai').assert;
const core = require('../src/core');
const config = require('./config');
const configUtil = require('./config-util');

describe('querying', () => {
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

  it('should return data when querying documentdb', (done) => {
    const connectionOptions = configUtil.getConnectionBySourceType(config, 'documentdb');

    const actionOptions = {
      operation: 'queryCollection',
      query: 'SELECT * FROM c',
      collection: 'testcollection01'
    };

    core.execute(connectionOptions, actionOptions, (err, results) => {
      if (err !== undefined && err !== null) {
        assert.fail(0, 1, `error returned querying documentdb: ${err.message}`);
      }
      done();
    });
  });

  it('should create document in documentdb', (done) => {
    const connectionOptions = configUtil.getConnectionBySourceType(config, 'documentdb');

    const randomId = Math.floor(Math.random() * 10000000).toString();

    const actionOptions = {
      operation: 'createDocument',
      collection: 'testcollection01',
      document: {
        id: randomId,
        message: "test document creation"
      }
    };

    core.execute(connectionOptions, actionOptions, (err, results) => {
      if (err !== undefined && err !== null) {
        assert.fail(0, 1, `error while inserting document in documentdb: ${err.message}`);
      }
      done();
    });
  });

  it('should return documents when searching mongodb', (done) => {
    const connectionOptions = configUtil.getConnectionBySourceType(config, 'mongodb');

    const actionOptions = {
      operation: 'queryCollection',
      collection: 'testcollection01'
    };

    core.execute(connectionOptions, actionOptions, (err, results) => {
      if (err !== undefined && err !== null) {
        assert.fail(0, 1, `error while querying collection in mongodb: ${err.message}`);
      }
      assert.isTrue(results.length > 0);
      done();
    });
  });
});