import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";

import styles from "./styles.module.scss";

//* Icon
import { CiBookmarkPlus } from "react-icons/ci";

//* Services
import {
  getMovie,
  getMovieCredits,
  getMovieImages,
  getMovieVideos,
} from "@/services/movie.service";
import Link from "next/link";

//* Teaser Key
function findTeaserKey(data) {
  for (const item of data) {
    if (item.type === "Trailer") {
      return item.key;
    }
  }
  return null;
}

//* Date format
function formatDate(dateString) {
  const dateParts = dateString.split("-");
  const day = dateParts[2];
  const month = dateParts[1];
  const year = dateParts[0];

  return `${day}.${month}.${year}`;
}

//* Lenght Format
function Lenght(min) {
  const hours = Math.floor(min / 60); // Saati hesapla
  const minutes = min % 60; // Dakikayı hesapla

  return `${hours}h ${minutes}m`;
}

async function MoviePage({ params, searchParams }) {
  const movieDetail = await getMovie(params.id);

  if (movieDetail.success == false) {
    notFound();
  }
  
  //* Promises
  const movieCreditsPromise = getMovieCredits(params.id);
  const movieImagesPromise = getMovieImages(params.id);
  const movieVideoPromise = getMovieVideos(params.id);

  const [
    { cast: movieCreditsCast },
    { crew: movieCreditsCrew },
    { results: movieVideo },
    { backdrops: movieImages },
  ] = await Promise.all([
    movieCreditsPromise,
    movieCreditsPromise,
    movieVideoPromise,
    movieImagesPromise,
  ]);

  // console.log(movieDetail);

  const formattedBudget = movieDetail?.budget?.toLocaleString("tr-TR", {
    style: "currency",
    currency: "USD",
  });

  //* Details
  const directorPerson = movieCreditsCrew.find(
    (person) => person.job === "Director"
  );
  const firstFiveNames = movieCreditsCast
    .slice(0, 5)
    .map((person) => person.name);
  const castNames = firstFiveNames.join(" • ");
  const length = Lenght(movieDetail.runtime);
  const teaserKey = findTeaserKey(movieVideo);
  const formattedDate = formatDate(movieDetail.release_date);

  return (
    <>
      <div className={styles.movieWrapper}>
        <h1 className={styles.movieTitle}>{movieDetail.title}</h1>
        <p>Original Title: {movieDetail.original_title}</p>
        <p className={styles.info}>
          {formattedDate} • {length} • {formattedBudget}
        </p>

        {/* Background Image */}
        <Image
          unoptimized
          src={`https://image.tmdb.org/t/p/original${movieDetail.backdrop_path}`}
          alt={movieDetail.title}
          className={styles.backgroundImg}
          width={100}
          height={100}
        />
        {/* Posters */}
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
            {movieImages.map((image, index) => {
              return (
                <img
                  key={index}
                  src={`https://image.tmdb.org/t/p/original${image.file_path}`}
                  alt={movieDetail.title}
                />
              );
            })}
          </div>
        </div>
        {/* Genres */}
        <ul>
          {movieDetail?.genres?.map((genre) => (
            <li>
              <Link href={`/categories/${genre.id}`}>{genre.name}</Link>
            </li>
          ))}
        </ul>
        {/* Detail */}
        <div className={styles.detail}>
          <div className={styles.overview}>
            <p>{movieDetail.overview}</p>
            <p>Director: {directorPerson.name} </p>
            <p>Cast: {castNames} </p>
          </div>
          <div className={styles.right}>
            <div className={styles.inner}>
              <CiBookmarkPlus />
              <div>
                <p>Add to Watchlist</p>
                <p>Added by 333k users</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MoviePage;
