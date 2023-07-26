import React from "react";

import { CategorieSection } from "@/components/categorie-section";
import {
  getSeriesCategories,
  getSeriesSingleCategorie,
} from "@/services/series.service";
import { FeaturedSerie } from "@/components/featured-serie";
import { CategorieNamesSeries } from "@/components/categorie-names-series";

async function Categorie({ params }) {
  let selectedCategory;

  const categoryPromise = getSeriesCategories();
  const [{ genres: categories }] = await Promise.all([categoryPromise]);
  const results = await getSeriesSingleCategorie(params.id, 1);
  // console.log(results);
  console.log("Series Categories worked", params);

  return (
    <>
      <FeaturedSerie movie={results?.results[0]} />
      <CategorieNamesSeries id={params?.id} categories={categories} />
      <CategorieSection
        title={
          categories?.find(
            (genre) => genre.id.toString() === selectedCategory?.id
          )?.name
        }
        movies={results?.results}
      />
    </>
  );
}

export default Categorie;
