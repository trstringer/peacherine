const DocumentClient = require('documentdb').DocumentClient;

module.exports = (() => {
  const testConnection = (connectionOptions, callback) => {
    const documentdbConnectionOptions = {
      endpoint: connectionOptions.endpoint,
      key: connectionOptions.key,
      database: connectionOptions.database
    };

    const client = new DocumentClient(
      documentdbConnectionOptions.endpoint,
      { masterKey: documentdbConnectionOptions.key }
    );

    client.readDatabase(`dbs/${documentdbConnectionOptions.database}`, (err, result) => {
      if (err) {
        callback(err);
      }
      else {
        callback();
      }
    });
  };

  const execute = (connectionOptions, actionOptions, callback) => {
    const collectionUrl = `dbs/${connectionOptions.database}/colls/${actionOptions.collection}`;
    const documentdbConnectionOptions = {
      endpoint: connectionOptions.endpoint,
      key: connectionOptions.key,
      database: connectionOptions.database
    };

    const client = new DocumentClient(
      documentdbConnectionOptions.endpoint,
      { masterKey: documentdbConnectionOptions.key }
    );

    client.queryDocuments(collectionUrl, actionOptions.query)
      .toArray(callback);
  };

  return {
    testConnection,
    execute
  };
})();