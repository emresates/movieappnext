import React from "react";
import HomeContainer from "@/containers/home";

import { getCategories, getSingleCategory } from "@/services/movie.service";

async function Categories({ params }) {
  let selectedCategory;

  const categoryPromise = getCategories();
  const [{ genres: categories }] = await Promise.all([categoryPromise]);

  const results = await getSingleCategory(params.id);

  //   console.log(params);
  //   console.log(categories);
  //   console.log(results);
  return (
    <HomeContainer
      categories={categories}
      selectedCategory={{
        id: params.category?.[0] || "",
        movies: results.results || [],
      }}
    />
  );
}

export default Categories;
