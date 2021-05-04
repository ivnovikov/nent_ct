const express = require("express");
const cors = require("cors");
const { promisify } = require("util");

const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);
const redisClient = {
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.set).bind(client),
};
const { getCacheValue, setCacheValue } = require("./blob-store")(redisClient);
const { getYoutubeTrailers } = require("./helpers.js");

const app = express();

app.use(cors());

app.get("/movie/:name", async (req, res) => {
  const movieName = req.params.name;
  try {
    const movieHash = await getCacheValue(movieName).catch(error =>
      console.log(error)
    );

    if (!movieHash) {
      const hash = await getYoutubeTrailers(movieName)
        .then(response => response[0].key)
        .catch(error => console.log(error));

      if (hash) {
        await setCacheValue(movieName, hash).catch(error => console.log(error));

        return res.json({ yt: hash, cache: false });
      } else {
        return res.json({});
      }
    } else {
      return res.json({ yt: movieHash, cache: true });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = app;
