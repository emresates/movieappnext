import React from "react";

import { FeaturedMovie } from "@/components/featured-movie";
import { CategorieNames } from "@/components/categorie-names";
import { MoviesSection } from "@/components/movies-section";
import { FeaturedSerie } from "@/components/featured-serie";

function getRandomInteger(min, max) {
  const number = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log("number", number);
  return number;
}

function HomeContainer({
  topRatedMovies = [],
  popularMovies = [],
  upcomingMovies = [],
  moviesInTheaters = [],
  categories = [],
  selectedCategory = "",

  topRatedSeries = [],
  popularSeries = [],
  seriesAiringToday = [],
  seriesOntheAir = [],
}) {
  return (
    <div>
      {moviesInTheaters.length > 0 ? (
        <FeaturedMovie movie={moviesInTheaters?.[0]} />
      ) : selectedCategory?.movies ? (
        <FeaturedMovie movie={selectedCategory?.movies[0]} />
      ) : popularMovies.length > 0 ? (
        <FeaturedMovie movie={popularMovies?.[getRandomInteger(0, 12)]} />
      ) : (
        topRatedSeries.length > 0 && (
          <FeaturedSerie serie={topRatedSeries?.[getRandomInteger(0, 12)]} />
        )
      )}
      <CategorieNames id={selectedCategory.id} categories={categories} />

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

      {popularSeries.length > 0 && (
        <MoviesSection
          title="Popular Series"
          movies={popularSeries.slice(0, 12)}
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
          movies={topRatedSeries.slice(0, 6)}
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
