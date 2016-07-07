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
      default:
        callback(new Error(`unknown operation: ${actionOptions.operation}`));
        break;
    }
  }

  function queryCollection(connectionOptions, actionOptions, callback) {
    const condition = actionOptions.condition || {};
    const connectionUrl = getConnectionUrl(connectionOptions);

    MongoClient.connect(connectionUrl, (err, db) => {
      if (err) {
        callback(err);
      }
      else {
        const cursor = db.collection(actionOptions.collection).find(condition);
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