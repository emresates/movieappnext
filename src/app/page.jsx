import React from "react";
import HomeContainer from "@/containers/home";

import { getTopRatedMovies, getPopularMovies } from "@/services/movie.service";
import { getPopularSeries, getTopRatedSeries } from "@/services/series.service";

async function Home() {
  const topRatedPromise = getTopRatedMovies();
  const popularPromise = getPopularMovies();
  const topRatedSeriesPromise = getTopRatedSeries();
  const popularSeriesPromise = getPopularSeries();

  const [
    { results: topRatedMovies },
    { results: popularMovies },
    { results: topRatedSeries },
    { results: popularSeries },
  ] = await Promise.all([
    topRatedPromise,
    popularPromise,
    topRatedSeriesPromise,
    popularSeriesPromise,
  ]);
  return (
    <HomeContainer
      topRatedMovies={topRatedMovies}
      popularMovies={popularMovies}
      topRatedSeries={topRatedSeries}
      popularSeries={popularSeries}
    />
  );
}

export default Home;
