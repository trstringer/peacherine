module.exports.getConnectionBySourceType = (config, sourceType) => {
  return config.connections.filter(
    (connection) => connection.dataSourceType === sourceType
  )[0];
};