const cache = new Map();

const TTL = 60 * 1000;


function cacheMiddleware(req, res, next) {
  const key = req.originalUrl;

  const cachedData = cache.get(key);

  
  if (!cachedData) {
    res.setHeader("X-Cache", "MISS");
    return next();
  }


  const age = Date.now() - cachedData.createdAt;

  if (age > TTL) {
    cache.delete(key);

    res.setHeader("X-Cache", "MISS");

    return next();
  }


  res.setHeader("X-Cache", "HIT");

  return res.json(cachedData.data);
}


function setCache(key, data) {
  cache.set(key, {
    data: data,
    createdAt: Date.now()
  });
}


function clearCache() {
  cache.clear();
}

module.exports = {
  cacheMiddleware,
  setCache,
  clearCache
};