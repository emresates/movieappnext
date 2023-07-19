import React from "react";
import HomeContainer from "@/containers/home";

import {
  getTopRatedMovies,
  getPopularMovies,
  getCategories,
  getSingleCategory,
  getUpcomingMovies,
  getMoviesinTheaters,
} from "@/services/movie.service";

async function Home({ params }) {
  let selectedCategory;

  const topRatedPromise = getTopRatedMovies();
  const popularPromise = getPopularMovies();
  const categoryPromise = getCategories();
  const upcomingPromise = getUpcomingMovies();
  const moviesInTheatersPromise = getMoviesinTheaters();

  const [
    { results: topRatedMovies },
    { results: popularMovies },
    { genres: categories },
    { results: upcomingMovies },
    { results: moviesInTheaters },
  ] = await Promise.all([
    topRatedPromise,
    popularPromise,
    categoryPromise,
    upcomingPromise,
    moviesInTheatersPromise,
  ]);

  if (params?.category?.length > 0) {
    const { results } = await getSingleCategory(params.category[0]);
    selectedCategory = results;
  }
  return (
    <HomeContainer
      topRatedMovies={topRatedMovies}
      popularMovies={popularMovies}
      categories={categories}
      upcomingMovies={upcomingMovies}
      moviesInTheaters={moviesInTheaters}
      selectedCategory={{
        id: params.category?.[0] || "",
        movies: selectedCategory ? selectedCategory.slice(0, 7) : [],
      }}
    />
  );
}

export default Home;
