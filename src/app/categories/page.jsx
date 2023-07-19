import React from "react";
import HomeContainer from "@/containers/home";

import { getCategories, getSingleCategory } from "@/services/movie.service";

async function Categories({ params }) {
  let selectedCategory;

  const categoryPromise = getCategories();
  const [{ genres: categories }] = await Promise.all([categoryPromise]);

  console.log(categories);
  return (
    <HomeContainer
      categories={categories}
      selectedCategory={{
        id: params?.category?.[0] || "",
        movies: selectedCategory ? selectedCategory.slice(0, 21) : [],
      }}
    />
  );
}

export default Categories;
