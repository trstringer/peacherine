const DocumentClient = require('documentdb').DocumentClient;

module.exports = (() => {
  function testConnection(connectionOptions, callback) {
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
      callback(err);
    });
  }

  function execute(connectionOptions, actionOptions, callback) {
    switch (actionOptions.operation) {
      case 'queryCollection':
        queryCollection(connectionOptions, actionOptions, callback);
        break;
      case 'createDocument':
        createDocument(connectionOptions, actionOptions, callback);
        break;
      default:
        callback(new Error(`unknown action operation: ${actionOptions.operation}`));
        break;
    }
  }

  function getDatabaseUrl(connectionOptions) {
    return `dbs/${connectionOptions.database}`;
  }

  function getCollectionUrl(connectionOptions, collectionName) {
    return `${getDatabaseUrl(connectionOptions)}/colls/${collectionName}`;
  }

  function queryCollection(connectionOptions, actionOptions, callback) {
    const collectionUrl = getCollectionUrl(connectionOptions, actionOptions.collection);

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
  }

  function createDocument(connectionOptions, actionOptions, callback) {
    const collectionUrl = getCollectionUrl(connectionOptions, actionOptions.collection);

    const documentdbConnectionOptions = {
      endpoint: connectionOptions.endpoint,
      key: connectionOptions.key,
      database: connectionOptions.database
    };

    const client = new DocumentClient(
      documentdbConnectionOptions.endpoint,
      { masterKey: documentdbConnectionOptions.key }
    );

    client.createDocument(collectionUrl, actionOptions.document, callback);
  }

  return {
    testConnection,
    execute
  };
})();