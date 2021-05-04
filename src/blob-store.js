module.exports = redisClient => {
  const setCacheValue = async (key, value) => {
    await redisClient.setAsync(key, JSON.stringify(value));
    return;
  };

  const getCacheValue = async key => {
    const rawData = await redisClient.getAsync(key);
    return JSON.parse(rawData);
  };

  return { getCacheValue, setCacheValue };
};
