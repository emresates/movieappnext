import React from "react";

import { FeaturedMovie } from "@/components/featured-movie";
import { Categories } from "@/components/categories";
import { MoviesSection } from "@/components/movies-section";

function HomeContainer({
  topRatedMovies = [],
  popularMovies = [],
  upcomingMovies = [],
  moviesInTheaters = [],
  categories = [],
  selectedCategory,
}) {
  // console.log(selectedCategory.movies[0]);
  return (
    <div>
      {topRatedMovies.length > 0 ? (
        <FeaturedMovie movie={topRatedMovies?.[0]} />
      ) : (
        <FeaturedMovie movie={selectedCategory.movies[0]} />
      )}
      <Categories categories={categories} />
      {selectedCategory?.movies?.length > 0 && (
        <MoviesSection
          title={
            categories?.find(
              (genre) => genre.id.toString() === selectedCategory.id
            )?.name
          }
          movies={selectedCategory.movies}
        />
      )}
      {upcomingMovies.length > 0 && (
        <MoviesSection
          title="Upcoming Movies"
          movies={upcomingMovies.slice(0, 12)}
        />
      )}
      {moviesInTheaters.length > 0 && (
        <MoviesSection
          title="Movies in Theaters"
          movies={moviesInTheaters.slice(0, 18)}
        />
      )}
      {popularMovies.length > 0 && (
        <MoviesSection
          title="Popular Movies"
          movies={popularMovies.slice(0, 12)}
        />
      )}
      {topRatedMovies.length > 0 && (
        <MoviesSection
          title="Top Rated Movies"
          movies={topRatedMovies.slice(0, 6)}
        />
      )}
    </div>
  );
}

export default HomeContainer;
