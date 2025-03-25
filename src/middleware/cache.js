const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);

const cache = (duration) => {
  return async (req, res, next) => {
    if (req.method !== 'GET') {
      return next();
    }

    const key = `cache:${req.originalUrl}`;

    try {
      const cachedData = await redis.get(key);
      if (cachedData) {
        return res.json(JSON.parse(cachedData));
      }

      // Store original send function
      const originalSend = res.send;
      res.send = function (data) {
        // Cache the response
        redis.setex(key, duration, JSON.stringify(data));
        // Call original send
        originalSend.call(this, data);
      };

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = cache; 