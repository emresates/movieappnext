import React from "react";
import HomeContainer from "@/containers/home";

import {
  getTopRatedMovies,
  getPopularMovies,
  getUpcomingMovies,
  getMoviesinTheaters,
  getCategories,
} from "@/services/movie.service";

async function Movies({ params }) {
  let selectedCategory;

  const topRatedPromise = getTopRatedMovies();
  const popularPromise = getPopularMovies();
  const upcomingPromise = getUpcomingMovies();
  const moviesInTheatersPromise = getMoviesinTheaters();
  const categoryPromise = getCategories();

  const [
    { results: topRatedMovies },
    { results: popularMovies },
    { results: upcomingMovies },
    { results: moviesInTheaters },
    { genres: categories },
  ] = await Promise.all([
    topRatedPromise,
    popularPromise,
    upcomingPromise,
    moviesInTheatersPromise,
    categoryPromise,
  ]);

  return (
    <HomeContainer
      topRatedMovies={topRatedMovies}
      popularMovies={popularMovies}
      upcomingMovies={upcomingMovies}
      moviesInTheaters={moviesInTheaters}
      categories={categories}
      selectedCategory={{
        id: params?.category?.[0] || "",
        movies: selectedCategory ? selectedCategory.slice(0, 21) : [],
      }}
    />
  );
}

export default Movies;
