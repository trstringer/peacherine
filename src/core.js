const mssqlConnector = require('./mssql-connector');

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
      default:
        callback(new Error(`unknown data source type ${connectionOptions.dataSoureType}`));
        break;
    }
  };

  return {
    getDataSourceTypes,
    testConnection
  };
})();