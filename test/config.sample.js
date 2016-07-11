// this is a sample config module that you can use as a 
// starting base to run the unit tests. all you should do 
// with this is the following:
//
//  1. copy/rename to config.js (keep it in test folder)
//  2. input your environment-specific database
//  3. run the tests

module.exports = {
  connections: [
    {
      dataSourceType: 'mssql',
      server: '...',
      database: '...',
      username: '...',
      password: '...'
    },
    {
      dataSourceType: 'documentdb',
      endpoint: '...',
      key: '...',
      // the test requires a collection to exist 
      // named testcollection01 in your ddb database
      // 
      // todo: remove this non-default test dependency
      database: '...'
    },
    {
      dataSourceType: 'mongodb',
      host: '...',
      port: 27017,
      database: '...'
    },
    {
      dataSourceType: 'mysql',
      server: '...',
      database: '...',
      username: '...',
      password: '...'
    }
  ]
};