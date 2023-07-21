import React from "react";

import { FeaturedMovie } from "@/components/featured-movie";
import { Categories } from "@/components/categories";
import { MoviesSection } from "@/components/movies-section";
import { FeaturedSerie } from "@/components/featured-serie";

// topRatedSeries={topRatedSeries}
// popularSeries={popularSeries}
// seriesAiringToday={seriesAiringToday}
// seriesOntheAir={seriesOntheAir}

function HomeContainer({
  topRatedMovies = [],
  popularMovies = [],
  upcomingMovies = [],
  moviesInTheaters = [],
  categories = [],
  selectedCategory,

  topRatedSeries = [],
  popularSeries = [],
  seriesAiringToday = [],
  seriesOntheAir = [],
}) {
  // console.log(selectedCategory.movies[0]);
  console.log(seriesAiringToday);
  return (
    <div>
      {moviesInTheaters.length > 0 ? (
        <FeaturedMovie movie={moviesInTheaters?.[0]} />
      ) : selectedCategory?.movies ? (
        <FeaturedMovie movie={selectedCategory?.movies[0]} />
      ) : (
        ""
      )}
      {seriesOntheAir.length > 0 && (
        <FeaturedSerie serie={seriesOntheAir?.[0]} />
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

      {topRatedSeries.length > 0 && (
        <MoviesSection
          title="Top Rated Series"
          movies={topRatedSeries.slice(0, 12)}
        />
      )}
      {popularSeries.length > 0 && (
        <MoviesSection
          title="Popular Series"
          movies={popularSeries.slice(0, 18)}
        />
      )}
      {seriesAiringToday.length > 0 && (
        <MoviesSection
          title="Series Airing Today"
          movies={seriesAiringToday.slice(0, 12)}
        />
      )}
      {seriesOntheAir.length > 0 && (
        <MoviesSection
          title="Series On The Air"
          movies={seriesOntheAir.slice(0, 6)}
        />
      )}
    </div>
  );
}

export default HomeContainer;
