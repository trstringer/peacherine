const mssql = require('mssql');

module.exports = (() => {
  const testConnection = (connectionOptions, callback) => {
    callback(new Error('testing connection return'));
  };
  
  return {
    testConnection
  };
})();