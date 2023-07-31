import React from "react";
import dynamic from "next/dynamic";

import FeaturedMovie from "@/components/featured-movie";
import { CategorieNamesMovies } from "@/components/categorie-names-movies";
// import MoviesSection from "@/components/movies-section";
import { FeaturedSerie } from "@/components/featured-serie";
import { CategorieNamesSeries } from "@/components/categorie-names-series";

const MoviesSection = dynamic(() => import("@/components/movies-section"));

function getRandomInteger(min, max) {
  const number = Math.floor(Math.random() * (max - min + 1)) + min;
  // console.log("number", number);
  return number;
}

function HomeContainer({
  topRatedMovies = [],
  popularMovies = [],
  upcomingMovies = [],
  moviesInTheaters = [],
  categories = [],
  seriesCategories = [],
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

      {categories.length > 0 && (
        <CategorieNamesMovies
          id={selectedCategory.id}
          categories={categories}
        />
      )}

      {seriesCategories.length > 0 && (
        <CategorieNamesSeries
          id={selectedCategory.id}
          categories={seriesCategories}
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
