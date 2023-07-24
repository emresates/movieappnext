import React from "react";
import { notFound } from "next/navigation";

import styles from "./styles.module.scss";

import Image from "next/image";

//* Services
import {
  getMovie,
  getMovieImages,
  getMovieVideos,
} from "@/services/movie.service";

function findTeaserKey(data) {
  for (const item of data) {
    if (item.type === "Teaser") {
      return item.key;
    }
  }
  return null;
}

async function MoviePage({ params, searchParams }) {
  const movieDetail = await getMovie(params.id);
  const movieVideo = await getMovieVideos(params.id);
  const { backdrops: movieImages } = await getMovieImages(params.id);

  console.log(movieImages);
  if (movieDetail.success == false) {
    notFound();
  }
  const genreNames = movieDetail?.genres?.map((genre) => genre.name).join(", ");
  const formattedBudget = movieDetail?.budget?.toLocaleString("tr-TR", {
    style: "currency",
    currency: "USD",
  });
  const teaserKey = findTeaserKey(movieVideo.results);

  return (
    <>
      <div className={styles.movieWrapper}>
        <h1 className={styles.movieTitle}>{movieDetail.title}</h1>
        <div className={styles.moviePoster}>
          <Image
            unoptimized
            src={`https://image.tmdb.org/t/p/original${movieDetail.poster_path}`}
            alt={movieDetail.title}
            fill
          />
          <iframe
            src={`https://www.youtube.com/embed/${teaserKey}`}
            allowfullscreen
          />
          <Image
            unoptimized
            src={`https://image.tmdb.org/t/p/original${movieDetail.backdrop_path}`}
            alt={movieDetail.title}
            fill
          />

          {movieImages.map((image) => {
            return (
              <Image
                unoptimized
                src={`https://image.tmdb.org/t/p/original${image.file_path}`}
                alt={movieDetail.title}
                fill
              />
            );
          })}
        </div>
        <p className={`${styles.overview}`}>{movieDetail.overview}</p>
        <p>Genres: {genreNames}</p>
        <p>Budget: {formattedBudget}</p>
        <p>Release Data: {movieDetail.release_date} </p>
        <p>Length: {movieDetail.runtime}</p>
        <p>Language: {movieDetail.original_language} </p>
      </div>
    </>
  );
}

export default MoviePage;
