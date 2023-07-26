import React from "react";
import { notFound } from "next/navigation";

import styles from "./styles.module.scss";

import Image from "next/image";
//* Query
import {
  getSerie,
  getSerieCredits,
  getSerieImages,
  getSerieVideos,
} from "@/services/series.service";

//* Icon
import { CiBookmarkPlus } from "react-icons/ci";
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
function formatDate(firstData, lastData) {
  const firstDate = firstData.split("-");
  const lastDate = lastData.split("-");
  const yearFirst = firstDate[0];
  const yearLast = lastDate[0];

  return `${yearFirst}-${yearLast}`;
}

async function SeriePage({ params, searchParams }) {
  const serieDetail = await getSerie(params.id);

  if (!serieDetail) {
    notFound();
  }

  console.log(serieDetail);

  //* Promises
  const serieCreditsPromise = getSerieCredits(params.id);
  const serieImagesPromise = getSerieImages(params.id);
  const serieVideoPromise = getSerieVideos(params.id);

  const [
    { cast: serieCreditsCast },
    { results: serieVideos },
    { backdrops: serieImages },
  ] = await Promise.all([
    serieCreditsPromise,
    serieVideoPromise,
    serieImagesPromise,
  ]);

  //* Details
  const directorPerson = serieDetail.created_by[0]?.name;
  const firstFiveNames = serieCreditsCast
    .slice(0, 5)
    .map((person) => person.name);
  const castNames = firstFiveNames.join(" • ");
  const teaserKey = findTeaserKey(serieVideos);
  const formattedDate = formatDate(
    serieDetail.first_air_date,
    serieDetail.last_air_date
  );

  return (
    <>
      <div className={styles.movieWrapper}>
        <h1 className={styles.movieTitle}>{serieDetail.name}</h1>
        <p>Original Name: {serieDetail.original_name}</p>
        <p>
          {formattedDate} • {serieDetail.status} •{" "}
          {serieDetail.original_language}
          {serieDetail.episode_run_time > 0 &&
            `• ${serieDetail.episode_run_time}m`}
        </p>

        {/* Background Image */}
        <Image
          unoptimized
          src={`https://image.tmdb.org/t/p/original${serieDetail.backdrop_path}`}
          alt={serieDetail.title}
          className={styles.backgroundImg}
          width={100}
          height={100}
        />

        {/* Posters */}
        <div className={styles.moviePoster}>
          <Image
            unoptimized
            src={`https://image.tmdb.org/t/p/original${serieDetail.poster_path}`}
            alt={serieDetail.title}
            fill
          />
          {serieVideos.length > 0 && (
            <iframe
              src={`https://www.youtube.com/embed/${teaserKey}`}
              allowfullscreen
              width={700}
            />
          )}

          <div className={styles.posters}>
            {serieImages.map((image, index) => {
              return (
                <img
                  key={index}
                  src={`https://image.tmdb.org/t/p/original${image.file_path}`}
                  alt={serieImages.title}
                />
              );
            })}
          </div>
        </div>

        {/* Genres */}
        <ul>
          {serieDetail?.genres?.map((genre) => (
            <li>
              <Link href={`/categories/${genre.id}`}>{genre.name}</Link>
            </li>
          ))}
        </ul>

        {/* Detail */}
        <div className={styles.detail}>
          <div className={styles.overview}>
            <p>{serieDetail.overview}</p>
            {directorPerson && <p>Director: {directorPerson} </p>}
            {castNames && <p>Cast: {castNames} </p>}
            <p>
              {serieDetail.number_of_seasons} Season •{" "}
              {serieDetail.number_of_episodes} Episode
            </p>
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

export default SeriePage;
