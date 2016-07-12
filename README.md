# Peacherine

***The cross-platform and multi-datasource query module***

*Want to see support for another data source type? Open an issue so that it can be prioritized and tracked*

**Future development: continue to add popular database management systems (SQL, NoSQL, whatever...)**

 - [Why?](#why)
 - [Install](#install)
 - [Supported data sources](#supported-data-sources)
   - [SQL Server and SQL Azure](#sql-server-and-sql-azure)
     - [Run query](#run-query-sql)
     - [Test connection](#test-connection-sql)
   - [Azure DocumentDB](#azure-documentdb)
     - [Query collection](#query-collection-documentdb)
     - [Insert document](#insert-document-documentdb)
     - [Test connection](#test-connection-documentdb)
   - [MongoDB](#mongodb)
     - [Query collection](#query-all-documents-mongodb)
     - [Query collection with filter](#query-documents-in-collection-with-filter-mongodb)
     - [Insert document](#insert-document-mongodb)
     - [Update document](#update-document-mongodb)
     - [Delete document](#delete-document-mongodb)
     - [Test connection](#test-connectiono-mongodb)
   - [MySQL](#mysql)
     - [Run query](#run-query-mysql)
     - [Test connection](#test-connection-mysql)
 - [Test and contribute](#test)

### Why?

I think you should be able to query all mainstream data sources from any machine, and this module is the abstraction for that functionality to be consumed by CLI or GUI tools

### Install

```
$ npm install peacherine
```

## Supported data sources

### Get supported data sources

```javascript
const peacherine = require('peacherine');

const supportedDataSources = peacherine.getDataSourceTypes();
// returns a string array of data source types
```

# SQL Server and SQL Azure

## Run query (SQL)

```javascript
const peacherine = require('peacherine');

const connectionOptions = {
  dataSourceType = 'mssql',
  server: '...',
  database: '...',
  username: '...',
  password: '...'
};

const actionOptions = {
  query: 'SELECT object_id, name FROM sys.objects'
};

peacherine.run(connectionOptions, actionOptions, (err, results) => {
  // handle err and results, if any
});
```

## Test connection (SQL)

```javascript
const peacherine = require('peacherine');

const connectionOptions = {
  dataSourceType = 'mssql',
  server: '...',
  database: '...',
  username: '...',
  password: '...'
};

peacherine.testConnection(connectionOptions, (err) => {
  if (err) {
    // failed connection
  }
  else {
    // successful connection
  }
});
```

# Azure DocumentDB

## Query collection (DocumentDB)

```javascript
const peacherine = require('peacherine');

const connectionOptions = {
  dataSourceType: 'documentdb',
  endpoint: 'https://...documents.azure.com:.../',
  key: '...',
  database: '...'
};

const actionOptions = {
  operation: 'queryCollection',
  query: 'SELECT * FROM c',
  collection: 'collection-name'
};

peacherine.run(connectionOptions, actionOptions, (err, results) => {
  // handle err and results
});
```

## Insert document (DocumentDB)

```javascript
const peacherine = require('peacherine');

const connectionOptions = {
  dataSourceType: 'documentdb',
  endpoint: 'https://...documents.azure.com:.../',
  key: '...',
  database: '...'
};

const actionOptions = {
  operation: 'createDocument',
  collection: 'collection-name',
  document: {
    id: 'some-id',
    message: 'test document creation'
  }
};

peacherine.run(connectionOptions, actionOptions, (err, results) => {
  // handle err and results
});
```

## Test connection (DocumentDB)

```javascript
const peacherine = require('peacherine');

const connectionOptions = {
  dataSourceType: 'documentdb',
  endpoint: 'https://...documents.azure.com:.../',
  key: '...',
  database: '...'
};

peacherine.testConnection(connectionOptions, (err) => {
  if (err) {
    // failed connection
  }
  else {
    // successful connection
  }
});
```

# MongoDB

## Query all documents (MongoDB)

```javascript
const peacherine = require('peacherine');

const connectionOptions = {
  dataSourceType: 'mongodb',
  host: '...',
  port: 27017,
  database: '...'
};

const actionOptions = {
  operation: 'queryCollection',
  collection: 'collection-name'
};

peacherine.run(connectionOptions, actionOptions, (err, results) => {
  // handle err and results
});
```

## Query documents in collection with filter (MongoDB)

```javascript
const peacherine = require('peacherine');

const connectionOptions = {
  dataSourceType: 'mongodb',
  host: '...',
  port: 27017,
  database: '...'
};

const actionOptions = {
  operation: 'queryCollection',
  collection: 'collection-name',
  filter: {
    id: 1
  }
};

peacherine.run(connectionOptions, actionOptions, (err, results) => {
  // handle err and results
});
```

## Insert document (MongoDB)

```javascript
const peacherine = require('peacherine');

const connectionOptions = {
  dataSourceType: 'mongodb',
  host: '...',
  port: 27017,
  database: '...'
};

const actionOptions = {
  operation: 'createDocument',
  collection: 'collection-name',
  document: {
    id: 1,
    message: 'test document creation'
  }
};

peacherine.run(connectionOptions, actionOptions, (err) => {
  // handle err
});
```

## Update document (MongoDB)

```javascript
const peacherine = require('peacherine');

const connectionOptions = {
  dataSourceType: 'mongodb',
  host: '...',
  port: 27017,
  database: '...'
};

const actionOptions = {
  operation: 'updateDocuments',
  collection: 'collection-name',
  filter: {
    id: 1
  },
  updateOptions: {
    $set: {
      message: 'my new message'
    }
  }
};

peacherine.run(connectionOptions, actionOptions, (err, result) => {
  // handle err and result
});
```

## Delete document (MongoDB)

```javascript
const peacherine = require('peacherine');

const connectionOptions = {
  dataSourceType: 'mongodb',
  host: '...',
  port: 27017,
  database: '...'
};

actionOptions = {
  operation: 'deleteDocuments',
  collection: 'collection-name',
  filter: {
    id: 1
  }
};

peacherine.run(connectionOptions, actionOptions, (err, result) => {
  // handle err and result
});
```

## Test connection (MongoDB)

```javascript
const peacherine = require('peacherine');

const connectionOptions = {
  dataSourceType: 'mongodb',
  host: '...',
  port: 27017,
  database: '...'
};

peacherine.testConnection(connectionOptions, (err) => {
  if (err) {
    // failed connection
  }
  else {
    // successful connection
  }
});
```

# MySQL

## Run query (MySQL)

```javascript
const peacherine = require('peacherine');

const connectionOptions = {
  dataSourceType: 'mysql',
  server: '...',
  database: '...',
  username: '...',
  password: '...'
};

const actionOptions = {
  query: 'SELECT * FROM information_schema.tables'
};

peacherine.run(connectionOptions, actionOptions, (err, results) => {
  // handle err and results, if any
});
```

## Test connection (MySQL)

```javascript
const peacherine = require('peacherine');

const connectionOptions = {
  dataSourceType: 'mysql',
  server: '...',
  database: '...',
  username: '...',
  password: '...'
};

peacherine.testConnection(connectionOptions, (err) => {
  if (err) {
    // failed connection
  }
  else {
    // successful connection
  }
});
```

# Test

Want to contribute?  Clone the repo and use `npm test` to run unit tests

```
$ git clone https://github.com/tstringer/peacherine.git
$ cd peacherine
$ npm install
$ npm test
```