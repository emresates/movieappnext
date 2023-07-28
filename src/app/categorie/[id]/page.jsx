import React from "react";

import { getCategories, getSingleCategory } from "@/services/movie.service";
import FeaturedMovie from "@/components/featured-movie";
import { CategorieSection } from "@/components/categorie-section";
import { CategorieNamesMovies } from "@/components/categorie-names-movies";

async function Categorie({ params }) {
  const categoryPromise = getCategories();
  const [{ genres: categories }] = await Promise.all([categoryPromise]);
  const results = await getSingleCategory(params.id, 1);
  // console.log(results);
  console.log("Movies Categories worked", params);
  return (
    <>
      <FeaturedMovie movie={results?.results[0]} />
      <CategorieNamesMovies id={params?.id} categories={categories} />
      <CategorieSection
        title={
          categories?.find((genre) => genre.id.toString() === params?.id)?.name
        }
        movies={results?.results}
        type="movie"
      />
    </>
  );
}

export default Categorie;
