import React from "react";
import { notFound } from "next/navigation";

import styles from "./styles.module.scss";

import Image from "next/image";
//* Query
import { getMovie } from "@/services/movie.service";

async function MoviePage({ params, searchParams }) {
  const movieDetail = await getMovie(params.id);

  if (!movieDetail) {
    notFound();
  }
  console.log(movieDetail);
  const genreNames = movieDetail.genres.map((genre) => genre.name).join(", ");
  const formattedBudget = movieDetail.budget.toLocaleString("tr-TR", {
    style: "currency",
    currency: "USD",
  });
  return (
    <>
      <div className={styles.movieWrapper}>
        <h1 className={styles.movieTitle}>{movieDetail.title}</h1>
        <p className={`${styles.overview}`}>{movieDetail.overview}</p>
        <p>Genres: {genreNames}</p>
        <p>Budget: {formattedBudget}</p>
        <p>Release Data: {movieDetail.release_date} </p>
        <p>Time: {movieDetail.runtime}</p>
        <p>Language: {movieDetail.original_language} </p>

        <div className={styles.moviePoster}>
          <Image
            unoptimized
            src={`https://image.tmdb.org/t/p/original${movieDetail.backdrop_path}`}
            alt={movieDetail.title}
            fill
          />
        </div>
      </div>
    </>
  );
}

export default MoviePage;
