import React from "react";

import { FeatureMovieLoading } from "@/components/featured-movie/loading";
import { CategorieNamesMoviesLoading } from "@/components/categorie-names-movies/loading";
import { MoviesSectionLoading } from "@/components/movies-section/loading";

export default function MovieLoading() {
  return (
    <div style={{ height: "100%" }}>
      <FeatureMovieLoading />
      <CategorieNamesMoviesLoading />
      <MoviesSectionLoading />
      <MoviesSectionLoading />
      <MoviesSectionLoading />
    </div>
  );
}
