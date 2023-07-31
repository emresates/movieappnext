import React from "react";

import { CategorieNamesSeriesLoading } from "@/components/categorie-names-series/loading";
import { FeatureSerieLoading } from "@/components/featured-serie/loading";
import { MoviesSectionLoading } from "@/components/movies-section/loading";

export default function SerieLoading() {
  return (
    <div style={{ height: "100%" }}>
      <FeatureSerieLoading />
      <CategorieNamesSeriesLoading />
      <MoviesSectionLoading />
      <MoviesSectionLoading />
      <MoviesSectionLoading />
    </div>
  );
}
