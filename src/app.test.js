const nock = require("nock");
const request = require("supertest");
const sinon = require("sinon");

const redisClient = require("fakeredis").createClient();
sinon.stub(require("redis"), "createClient").returns(redisClient);

const app = require("./app");

const API = require("./mocks/apis");
const viaplayMovieData = require("./mocks/arrival-data.json");
const tmdbMovieData = require("./mocks/arrival-tmdb-data.json");
const tmdbMovieInfo = require("./mocks/arrival-tmdb-info.json");

test("test /movie endpoint with mocks", async () => {
  nock(API.VIAPLAY)
    .defaultReplyHeaders({
      "access-control-allow-origin": "*",
      "access-control-allow-credentials": "true",
    })
    .get(API.VIAPLAY_FILM)
    .reply(200, viaplayMovieData);
  nock(API.TMDB)
    .defaultReplyHeaders({
      "access-control-allow-origin": "*",
      "access-control-allow-credentials": "true",
    })
    .get(API.TMDB_FIND)
    .reply(200, tmdbMovieData);
  nock(API.TMDB)
    .defaultReplyHeaders({
      "access-control-allow-origin": "*",
      "access-control-allow-credentials": "true",
    })
    .get(API.TMDB_MOVIE)
    .reply(200, tmdbMovieInfo);

  const res = await request(app).get("/movie/arrival-2016");
  expect(res.status).toBe(200);
  expect(res.body).toEqual(API.RESULT);
});
