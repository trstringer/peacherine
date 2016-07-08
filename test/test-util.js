module.exports.getConnectionBySourceType = (config, sourceType) => {
  return config.connections.filter(
    (connection) => connection.dataSourceType === sourceType
  )[0];
};

module.exports.getRandomId = () => {
  return Math.floor(Math.random() * 10000000);
};