const assert = require('chai').assert;
const core = require('../src/core');
const config = require('./config');
const testUtil = require('./test-util');

describe('mongodb querying', () => {
  it('should return documents', (done) => {
    const connectionOptions = testUtil.getConnectionBySourceType(config, 'mongodb');

    const actionOptions = {
      operation: 'queryCollection',
      collection: 'testcollection01'
    };

    core.execute(connectionOptions, actionOptions, (err, results) => {
      if (err) {
        assert.fail(0, 1, `error while querying collection in mongodb: ${err.message}`);
      }
      assert.isTrue(results.length > 0);
      done();
    });
  });

  it('should return a single document', (done) => {
    const connectionOptions = testUtil.getConnectionBySourceType(config, 'mongodb');

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
      if (err) {
        assert.fail(0, 1, `error while querying collection in mongodb: ${err.message}`);
      }
      assert.equal(results.length, 1);
      done();
    });
  });

  it('should insert a document', (done) => {
    const connectionOptions = testUtil.getConnectionBySourceType(config, 'mongodb');

    const randomId = testUtil.getRandomId();

    const actionOptions = {
      operation: 'createDocument',
      collection: 'testcollection01',
      document: {
        id: randomId,
        message: 'test document creation'
      }
    };

    core.execute(connectionOptions, actionOptions, (err) => {
      if (err) {
        assert.fail(0, 1, `error while creating document in mongodb: ${err.message}`);
      }
      done();
    });
  });

  it('should update a document', (done) => {
    const connectionOptions = testUtil.getConnectionBySourceType(config, 'mongodb');

    const randomId = testUtil.getRandomId().toString();

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
      if (err) {
        assert.fail(0, 1, `error while updating mongodb document(s): ${err.message}`);
      }
      else {
        assert.isTrue(result.modifiedCount > 0, `expected more than 0 rows to be modified, but actual is ${result.modifiedCount}`);
      }
      done();
    });
  });

  it('should delete a document', (done) => {
    // the logic of this test is to create a document 
    // first and then to delete the same document to 
    // ensure that this test has minimal dependencies
    const connectionOptions = testUtil.getConnectionBySourceType(config, 'mongodb');

    const randomId = testUtil.getRandomId();

    let actionOptions = {
      operation: 'createDocument',
      collection: 'testcollection01',
      document: {
        id: randomId,
        message: 'test document creation'
      }
    };

    core.execute(connectionOptions, actionOptions, (err) => {
      if (err) {
        assert.fail(0, 1, `error while inserting doc into mongodb: ${err.message}`);
      }

      actionOptions = {
        operation: 'deleteDocuments',
        collection: 'testcollection01',
        filter: {
          id: randomId
        }
      };

      core.execute(connectionOptions, actionOptions, (err, result) => {
        if (err) {
          assert.fail(0, 1, `error while deleting document: ${err.message}`);
        }
        assert.equal(result.deletedCount, 1, `expected deleted count to be 1 but returned ${result.deletedCount}`);
        done();
      });
    });
  });
});