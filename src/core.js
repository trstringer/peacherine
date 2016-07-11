const mssqlConnector = require('./mssql-connector');
const documentdbConnector = require('./documentdb-connector');
const mongodbConnector = require('./mongodb-connector');
const mysqlConnector = require('./mysql-connector');

module.exports = (() => {
  const dataSourceTypes = [
    'mssql',
    'mongodb',
    'documentdb',
    'mysql'
  ];

  function getDataSourceTypes() {
    return dataSourceTypes;
  }

  function testConnection(connectionOptions, callback) {
    switch (connectionOptions.dataSourceType) {
      case 'mssql':
        mssqlConnector.testConnection(connectionOptions, callback);
        break;
      case 'documentdb':
        documentdbConnector.testConnection(connectionOptions, callback);
        break;
      case 'mongodb':
        mongodbConnector.testConnection(connectionOptions, callback);
        break;
      case 'mysql':
        mysqlConnector.testConnection(connectionOptions, callback);
        break;
      default:
        callback(new Error(`unknown data source type ${connectionOptions.dataSoureType}`));
        break;
    }
  }

  function execute(connectionOptions, actionOptions, callback) {
    switch (connectionOptions.dataSourceType) {
      case 'mssql':
        mssqlConnector.execute(connectionOptions, actionOptions, callback);
        break;
      case 'documentdb':
        documentdbConnector.execute(connectionOptions, actionOptions, callback);
        break;
      case 'mongodb':
        mongodbConnector.execute(connectionOptions, actionOptions, callback);
        break;
      case 'mysql':
        mysqlConnector.execute(connectionOptions, actionOptions, callback);
        break;
      default:
        callback(new Error(`unknown data source type ${connectionOptions.dataSourceType}`));
        break;
    }
  }

  return {
    getDataSourceTypes,
    testConnection,
    execute
  };
})();