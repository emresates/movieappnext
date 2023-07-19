import React from "react";
import HomeContainer from "@/containers/home";

import {
  getTopRatedMovies,
  getPopularMovies,
  getUpcomingMovies,
  getMoviesinTheaters,
} from "@/services/movie.service";

async function Movies({ params }) {
  const topRatedPromise = getTopRatedMovies();
  const popularPromise = getPopularMovies();
  const upcomingPromise = getUpcomingMovies();
  const moviesInTheatersPromise = getMoviesinTheaters();

  const [
    { results: topRatedMovies },
    { results: popularMovies },
    { results: upcomingMovies },
    { results: moviesInTheaters },
  ] = await Promise.all([
    topRatedPromise,
    popularPromise,
    upcomingPromise,
    moviesInTheatersPromise,
  ]);

  return (
    <HomeContainer
      topRatedMovies={topRatedMovies}
      popularMovies={popularMovies}
      upcomingMovies={upcomingMovies}
      moviesInTheaters={moviesInTheaters}
    />
  );
}

export default Movies;
