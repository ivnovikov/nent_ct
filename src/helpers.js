const axios = require("axios");

const TMDB_API_KEY = "e42776d4fd7c64a4085ea3438ee6189b";

const getYoutubeTrailers = async name => {
  const VIAPLAY_API = "https://content.viaplay.se/pc-se/film/" + name;

  return await axios
    .get(VIAPLAY_API)
    .then(response => {
      const imdbId =
        response.data._embedded["viaplay:blocks"][0]._embedded[
          "viaplay:product"
        ].content.imdb.id;
      const TMDB_API_FIND_MOVIE =
        "https://api.themoviedb.org/3/find/" +
        imdbId +
        "?api_key=" +
        TMDB_API_KEY +
        "&language=en-US&external_source=imdb_id";

      return axios.get(TMDB_API_FIND_MOVIE);
    })
    .then(response => {
      const movieId = response.data.movie_results[0].id;
      const TMDB_API_MOVIE_INFO =
        "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?api_key=" +
        TMDB_API_KEY +
        "&language=en-US";

      return axios.get(TMDB_API_MOVIE_INFO);
    })
    .then(response => {
      const trailers = response.data.results.filter(
        obj => obj.type === "Trailer"
      );

      return trailers;
    })
    .catch(error => {
      throw error;
    });
};

module.exports = { getYoutubeTrailers };
