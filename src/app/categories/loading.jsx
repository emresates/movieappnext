"use client"
import React from "react";

import { CategoriesLoading } from "@/components/categories/loading";
import { FeatureMovieLoading } from "@/components/featured-movie/loading";
import { MoviesSectionLoading } from "@/components/movies-section/loading";

function HomeLoading() {
  return (
    <>
      <FeatureMovieLoading />
      <CategoriesLoading />
      <MoviesSectionLoading />
      <MoviesSectionLoading />
      <MoviesSectionLoading />
    </>
  );
}

export default HomeLoading;
