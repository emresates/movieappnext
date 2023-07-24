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

function formatDate(dateString) {
  const dateParts = dateString.split("-");
  const day = dateParts[2];
  const month = dateParts[1];
  const year = dateParts[0];

  return `${day} ${month} ${year}`;
}

async function MoviePage({ params, searchParams }) {
  const movieDetail = await getMovie(params.id);
  const movieVideo = await getMovieVideos(params.id);
  const { backdrops: movieImages } = await getMovieImages(params.id);

  // console.log(movieDetail);

  if (movieDetail.success == false) {
    notFound();
  }
  const formattedBudget = movieDetail?.budget?.toLocaleString("tr-TR", {
    style: "currency",
    currency: "USD",
  });
  const teaserKey = findTeaserKey(movieVideo.results);
  const formattedDate = formatDate(movieDetail.release_date);

  return (
    <>
      <div className={styles.movieWrapper}>
        <h1 className={styles.movieTitle}>{movieDetail.title}</h1>
        <Image
          unoptimized
          src={`https://image.tmdb.org/t/p/original${movieDetail.backdrop_path}`}
          alt={movieDetail.title}
          className={styles.backgroundImg}
          width={100}
          height={100}
        />
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
            width={700}
          />

          <div className={styles.posters}>
            {movieImages.map((image) => {
              return (
                <img
                  src={`https://image.tmdb.org/t/p/original${image.file_path}`}
                  alt={movieDetail.title}
                />
              );
            })}
          </div>
        </div>
        <ul>
          {movieDetail?.genres?.map((genre) => (
            <li>{genre.name}</li>
          ))}
        </ul>
        <p className={`${styles.overview}`}>{movieDetail.overview}</p>

        <p>Budget: {formattedBudget}</p>
        <p>Release Data: {formattedDate} </p>
        <p>Length: {movieDetail.runtime}</p>
        <p>Language: {movieDetail.original_language} </p>
      </div>
    </>
  );
}

export default MoviePage;
