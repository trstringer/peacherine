const assert = require('chai').assert;
const core = require('../src/core');
const config = require('./config');
const testUtil = require('./test-util');

describe('connections functionality', () => {
  it('should fail connection to fake data source', (done) => {
    const connectionOptions = {
      dataSourceType: 'mssql',
      server: 'notreal',
      database: 'notreal',
      username: 'user1',
      password: 'password'
    };

    core.testConnection(connectionOptions, (err) => {
      assert.isDefined(err);
      assert.isNotNull(err);
      done();
    });
  });

  it('should fail with unknown data source', (done) => {
    const connectionOptions = {
      dataSourceType: 'notrealdatasourcetype'
    };

    core.testConnection(connectionOptions, (err) => {
      assert.isNotNull(err);
      assert.isDefined(err);
      assert.equal(err.message, `unknown data source type ${connectionOptions.dataSoureType}`);
      done();
    });
  });

  it('should successfully connect to mssql', (done) => {
    const connectionOptions = testUtil.getConnectionBySourceType(config, 'mssql');

    core.testConnection(connectionOptions, (err) => {
      if (err) {
        assert.fail(0, 1, 'error on connection was expected to not error');
      }
      done();
    });
  });

  it('should successfully connect to documentdb', (done) => {
    const connectionOptions = testUtil.getConnectionBySourceType(config, 'documentdb');
    
    core.testConnection(connectionOptions, (err) => {
      if (err) {
        assert.fail(0, 1, 'error on connection was expected to not error');
      }
      done();
    });
  });

  it('should successfully connect to mongodb', (done) => {
    const connectionOptions = testUtil.getConnectionBySourceType(config, 'mongodb');

    core.testConnection(connectionOptions, (err) => {
      if (err) {
        assert.fail(0, 1, `error connecting to mongodb: ${err.message}`);
      }
      done();
    });
  });
});