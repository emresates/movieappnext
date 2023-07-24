import React from "react";

import { getCategories, getSingleCategory } from "@/services/movie.service";
import { FeaturedMovie } from "@/components/featured-movie";
import { CategorieSection } from "@/components/categorie-section";
import { CategorieNames } from "@/components/categorie-names";

async function Categories({ params }) {
  let selectedCategory;

  const categoryPromise = getCategories();
  const [{ genres: categories }] = await Promise.all([categoryPromise]);
  const results = await getSingleCategory(params.id, 1);
  // console.log(results);
  console.log("Categories worked", params);

  return (
    <>
      <FeaturedMovie movie={results?.results[0]} />
      <CategorieNames id={params?.id} categories={categories} />
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

export default Categories;
