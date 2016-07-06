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

  const execute = (connectionOptions, actionOptions, callback) => {
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

    sqlConnection.connect((err) => {
      if (err) {
        callback(err);
      }
      else {
        let sqlRequest = new mssql.Request(sqlConnection);
        sqlRequest.query(actionOptions.query, callback);
      }
    });
  };
  
  return {
    testConnection,
    execute
  };
})();