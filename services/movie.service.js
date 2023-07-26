const API_URL = "https://api.themoviedb.org/3/";

const fetchMovieApi = async (pathname, query = "") => {
  try {
    const res = await fetch(
      `${API_URL}${pathname}?api_key=${process.env.API_KEY}&${query}`
    );
    return res.json();
  } catch (error) {
    throw new Error(error);
  }
};

const getTopRatedMovies = async () => {
  return fetchMovieApi("/movie/top_rated", "&page=1");
};

const getPopularMovies = async () => {
  return fetchMovieApi("/movie/popular", "&page=1");
};

const getUpcomingMovies = async () => {
  return fetchMovieApi(`/movie/upcoming`, "&page=1");
};

const getMoviesinTheaters = async () => {
  return fetchMovieApi(`/movie/now_playing`, "&page=1");
};

const getCategories = async () => {
  return fetchMovieApi("/genre/movie/list");
};

const getSingleCategory = async (genreId, page) => {
  return fetchMovieApi(
    "/discover/movie",
    `with_genres=${genreId}&page=${page}&sort_by=popularity.desc`
  );
};

const getMovie = async (movieId) => {
  return fetchMovieApi(`/movie/${movieId}`);
};

const getMovieVideos = async (movieId) => {
  return fetchMovieApi(`/movie/${movieId}/videos`);
};

const getMovieImages = async (movieId) => {
  return fetchMovieApi(`/movie/${movieId}/images`);
};

const getMovieCredits = async (movieId) => {
  return fetchMovieApi(`/movie/${movieId}/credits`);
};

export {
  fetchMovieApi,
  getTopRatedMovies,
  getPopularMovies,
  getUpcomingMovies,
  getMoviesinTheaters,
  getCategories,
  getSingleCategory,
  getMovie,
  getMovieVideos,
  getMovieImages,
  getMovieCredits,
};
