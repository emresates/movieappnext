const API_URL = "https://api.themoviedb.org/3/";

const fetchSeriesApi = async (pathname, query = "") => {
  try {
    const res = await fetch(
      `${API_URL}${pathname}?api_key=${process.env.API_KEY}&${query}`
    );
    return res.json();
  } catch (error) {
    throw new Error(error);
  }
};

const getTopRatedSeries = async () => {
  return fetchSeriesApi("/tv/top_rated", "&page=1");
};

const getPopularSeries = async () => {
  return fetchSeriesApi("/tv/popular", "&page=1");
};

const getSeriesAiringToday = async () => {
  return fetchSeriesApi("/tv/airing_today", "&page=1");
};

const getSeriesOntheAir = async () => {
  return fetchSeriesApi("/tv/on_the_air", "&page=1");
};

const getSerie = async (serieId) => {
  return fetchSeriesApi(`/tv/${serieId}`);
};

const getSerieVideos = async (serieId) => {
  return fetchSeriesApi(`/tv/${serieId}/videos`);
};

const getSerieImages = async (serieId) => {
  return fetchSeriesApi(`/tv/${serieId}/images`);
};

const getSerieCredits = async (serieId) => {
  return fetchSeriesApi(`/tv/${serieId}/credits`);
};

export {
  getTopRatedSeries,
  getPopularSeries,
  getSeriesAiringToday,
  getSeriesOntheAir,
  getSerie,
  getSerieVideos,
  getSerieImages,
  getSerieCredits,
};
