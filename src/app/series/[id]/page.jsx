import React from "react";
import { notFound } from "next/navigation";

import styles from "./styles.module.scss";

import Image from "next/image";
//* Query
import { getSerie, getSerieVideos } from "@/services/series.service";

async function MoviePage({ params, searchParams }) {
  const serieDetail = await getSerie(params.id);
  const serieVideos = await getSerieVideos(params.id);
  if (!serieDetail) {
    notFound();
  }
  const genreNames = serieDetail?.genres?.map((genre) => genre.name).join(", ");
  console.log(serieVideos);
  return (
    <>
      <div className={styles.movieWrapper}>
        <h1 className={styles.movieTitle}>{serieDetail.name}</h1>
        <p className={`${styles.overview}`}>{serieDetail.overview}</p>
        <p>Original Name: {serieDetail.original_name}</p>
        <p>Genres: {genreNames}</p>
        <p>First Air Date: {serieDetail.first_air_date} </p>
        <p>
          Last Episode Air Date: {serieDetail.last_episode_to_air.air_date}{" "}
        </p>
        <p>Episode Count: {serieDetail.number_of_episodes}</p>
        <p>Season Count: {serieDetail.number_of_seasons}</p>
        <p>Status: {serieDetail.status}</p>
        <p>Type: {serieDetail.type}</p>
        <p>Language: {serieDetail.original_language} </p>

        <div className={styles.moviePoster}>
          <Image
            unoptimized
            src={`https://image.tmdb.org/t/p/original${serieDetail.backdrop_path}`}
            alt={serieDetail.title}
            fill
          />
        </div>
      </div>
    </>
  );
}

export default MoviePage;
