import React from "react";

import { MoviesSectionLoading } from "@/components/movies-section/loading";
import { FeatureMovieLoading } from "@/components/featured-movie/loading";

export default function HomeLoading() {
  return (
    <div style={{ height: "100%" }}>
      <FeatureMovieLoading />
      <MoviesSectionLoading />
      <MoviesSectionLoading />
      <MoviesSectionLoading />
    </div>
  );
}
