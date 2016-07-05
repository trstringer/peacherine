const assert = require('chai').assert;
const core = require('../src/core');

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

  it('should should successfully connect to mssql', (done) => {
    const connectionOptions = {
      dataSourceType: 'mssql',
      username: '...username...',
      password: '...password...',
      server: '...server...',
      database: '...database...'
    };

    core.testConnection(connectionOptions, (err) => {
      if (err !== undefined && err !== null) {
        assert.fail(0, 1, 'error on connection was expected to not error');
      }
      done();
    });
  });
});