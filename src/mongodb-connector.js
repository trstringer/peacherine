const MongoClient = require('mongodb').MongoClient;

module.exports = (() => {
  function testConnection(connectionOptions, callback) {
    const connectionUrl = getConnectionUrl(connectionOptions);

    MongoClient.connect(connectionUrl, (err, db) => {
      callback(err);
      db.close();
    });
  }

  function getConnectionUrl(connectionOptions) {
    return `mongodb://${connectionOptions.host}:${connectionOptions.port}/${connectionOptions.database}`;
  }

  function execute(connectionOptions, actionOptions, callback) {
    switch (actionOptions.operation) {
      case 'queryCollection':
        queryCollection(connectionOptions, actionOptions, callback);
        break;
      case 'createDocument':
        createDocument(connectionOptions, actionOptions, callback);
        break;
      case 'updateDocuments':
        updateDocuments(connectionOptions, actionOptions, callback);
        break;
      case 'deleteDocuments':
        deleteDocuments(connectionOptions, actionOptions, callback);
        break;
      default:
        callback(new Error(`unknown operation: ${actionOptions.operation}`));
        break;
    }
  }

  function deleteDocuments(connectionOptions, actionOptions, callback) {
    const connectionUrl = getConnectionUrl(connectionOptions);

    MongoClient.connect(connectionUrl, (err, db) => {
      if (err) {
        callback(err);
      }
      else {
        db.collection(actionOptions.collection).deleteMany(actionOptions.filter, (err, result) => {
          if (err) {
            callback(err);
          }
          else {
            db.close();
            callback(null, result);
          }
        });
      }
    });
  }

  function updateDocuments(connectionOptions, actionOptions, callback) {
    const connectionUrl = getConnectionUrl(connectionOptions);

    MongoClient.connect(connectionUrl, (err, db) => {
      if (err) {
        callback(err);
      }
      else {
        db.collection(actionOptions.collection).updateMany(actionOptions.filter, actionOptions.updateOptions, (err, result) => {
          if (err) {
            callback(err);
          }
          else {
            db.close();
            callback(null, result);
          }
        });
      }
    });
  }

  function createDocument(connectionOptions, actionOptions, callback) {
    const connectionUrl = getConnectionUrl(connectionOptions);

    MongoClient.connect(connectionUrl, (err, db) => {
      if (err) {
        callback(err);
      }
      else {
        db.collection(actionOptions.collection).insertOne(actionOptions.document, (err, result) => {
          if (err) {
            callback(err);
          }
          else {
            db.close();
            callback();
          }
        });
      }
    });
  }

  function queryCollection(connectionOptions, actionOptions, callback) {
    const filter = actionOptions.filter || {};
    const connectionUrl = getConnectionUrl(connectionOptions);

    MongoClient.connect(connectionUrl, (err, db) => {
      if (err) {
        callback(err);
      }
      else {
        const cursor = db.collection(actionOptions.collection).find(filter);
        cursor.toArray((err, results) => {
          if (err) {
            callback(err);
          }
          else {
            db.close();
            callback(null, results);
          }
        });
      }
    });
  }
  
  return {
    testConnection,
    execute
  };
})();