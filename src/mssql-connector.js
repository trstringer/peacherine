const mssql = require('mssql');

module.exports = (() => {
  const testConnection = (connectionOptions, callback) => {
    const mssqlConnectionOptions = {
      user: connectionOptions.username,
      password: connectionOptions.password,
      server: connectionOptions.server,
      database: connectionOptions.database,
      options: {
        encrypt: true
      }
    };
    
    const sqlConnection = new mssql.Connection(mssqlConnectionOptions);

    sqlConnection.connect(callback);
  };
  
  return {
    testConnection
  };
})();