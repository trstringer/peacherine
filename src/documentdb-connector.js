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

  const query = (connectionOptions, queryOptions, callback) => {
    const collectionUrl = `dbs/${connectionOptions.database}/colls/${queryOptions.collection}`;
    const documentdbConnectionOptions = {
      endpoint: connectionOptions.endpoint,
      key: connectionOptions.key,
      database: connectionOptions.database
    };

    const client = new DocumentClient(
      documentdbConnectionOptions.endpoint,
      { masterKey: documentdbConnectionOptions.key }
    );

    client.queryDocuments(collectionUrl, queryOptions.query)
      .toArray(callback);
  };

  return {
    testConnection,
    query
  };
})();