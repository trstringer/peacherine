const mysql = require('mysql');

module.exports = (() => {
  function testConnection(connectionOptions, callback) {
    const mysqlConnectionOptions = {
      host: connectionOptions.server,
      database: connectionOptions.database,
      user: connectionOptions.username,
      password: connectionOptions.password
    };

    const connection = mysql.createConnection(mysqlConnectionOptions);
    
    connection.connect((err) => {
      if (err) {
        callback(err);
      }
      else {
        connection.end();
        callback();
      }
    });
  }

  function run(connectionOptions, actionOptions, callback) {
    const mysqlConnectionOptions = {
      host: connectionOptions.server,
      database: connectionOptions.database,
      user: connectionOptions.username,
      password: connectionOptions.password
    };

    const connection = mysql.createConnection(mysqlConnectionOptions);

    connection.query(actionOptions.query, callback);
  }
  
  return {
    testConnection,
    run
  };
})();