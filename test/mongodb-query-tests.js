const assert = require('chai').assert;
const core = require('../src/core');
const config = require('./config');
const configUtil = require('./config-util');

describe('mongodb querying', () => {
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

  it('should return a single document when searching mongodb', (done) => {
    const connectionOptions = configUtil.getConnectionBySourceType(config, 'mongodb');

    // this test requires that there is one document in the collection 
    // that has an id field set to the value 1
    //
    // these mongo shell commands would seed that successfully
    // $ mongo
    // $ use <database-name>
    // $ db.testcollection01.insertOne({id: 1, message: 'hello world'})
    //
    // todo: remove this test dependency
    const actionOptions = {
      operation: 'queryCollection',
      collection: 'testcollection01',
      filter: {
        id: 1
      }
    };

    core.execute(connectionOptions, actionOptions, (err, results) => {
      if (err !== undefined && err !== null) {
        assert.fail(0, 1, `error while querying collection in mongodb: ${err.message}`);
      }
      assert.equal(results.length, 1);
      done();
    });
  });

  it('should insert a document into a mongodb collection', (done) => {
    const connectionOptions = configUtil.getConnectionBySourceType(config, 'mongodb');

    const randomId = Math.floor(Math.random() * 10000000);

    const actionOptions = {
      operation: 'createDocument',
      collection: 'testcollection01',
      document: {
        id: randomId,
        message: 'test document creation'
      }
    };

    core.execute(connectionOptions, actionOptions, (err) => {
      if (err !== undefined && err !== null) {
        assert.fail(0, 1, `error while creating document in mongodb: ${err.message}`);
      }
      done();
    });
  });

  it('should update a document in a mongodb collection', (done) => {
    const connectionOptions = configUtil.getConnectionBySourceType(config, 'mongodb');

    const randomId = Math.floor(Math.random() * 10000000).toString();

    const actionOptions = {
      operation: 'updateDocuments',
      collection: 'testcollection01',
      filter: {
        id: 1
      },
      updateOptions: {
        $set: {
          message: randomId
        }
      }
    };

    core.execute(connectionOptions, actionOptions, (err, result) => {
      if (err !== undefined && err !== null) {
        assert.fail(0, 1, `error while updating mongodb document(s): ${err.message}`);
      }
      else {
        assert.isTrue(result.modifiedCount > 0, `expected more than 0 rows to be modified, but actual is ${result.modifiedCount}`);
      }
      done();
    });
  });
});