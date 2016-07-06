const mssqlConnector = require('./mssql-connector');
const documentdbConnector = require('./documentdb-connector');

module.exports = (() => {
  const dataSourceTypes = [
    'mssql',
    'mongodb',
    'documentdb'
  ];

  const getDataSourceTypes = () => {
    return dataSourceTypes;
  };

  const testConnection = (connectionOptions, callback) => {
    switch (connectionOptions.dataSourceType) {
      case 'mssql':
        mssqlConnector.testConnection(connectionOptions, callback);
        break;
      case 'documentdb':
        documentdbConnector.testConnection(connectionOptions, callback);
        break;
      default:
        callback(new Error(`unknown data source type ${connectionOptions.dataSoureType}`));
        break;
    }
  };

  const query = (connectionOptions, queryOptions, callback) => {
    switch (connectionOptions.dataSourceType) {
      case 'mssql':
        mssqlConnector.query(connectionOptions, queryOptions, callback);
        break;
      case 'documentdb':
        documentdbConnector.query(connectionOptions, queryOptions, callback);
        break;
      default:
        callback(new Error(`unknown data source type ${connectionOptions.dataSourceType}`));
        break;
    }
  };

  return {
    getDataSourceTypes,
    testConnection,
    query
  };
})();