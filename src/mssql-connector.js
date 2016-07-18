const mssql = require('mssql');

module.exports = (() => {
  function testConnection(connectionOptions, callback) {
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
  }

  function run(connectionOptions, actionOptions, callback) {
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
        var sqlRequest = new mssql.Request(sqlConnection);
        sqlRequest.query(actionOptions.query, callback);
      }
    });
  }
  
  return {
    testConnection,
    run
  };
})();