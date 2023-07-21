import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";

import styles from "./styles.module.css";

function FeaturedSerie({ serie = {}, isCompact = true }) {
  const { original_name, overview, backdrop_path } = serie;
//   console.log(serie);
  return (
    <div className={styles.movieWrapper}>
      <h1 className={styles.movieTitle}>{original_name}</h1>
      <p
        className={`${styles.overview} ${
          isCompact ? styles.shortOverview : ""
        }`}
      >
        {overview}
      </p>

      <div className={styles.actionButtons}>
        <Link className={styles.playButton} href={`/series/${serie.id}`}>
          Play
        </Link>
        <button className={styles.addButton}>
          <FaPlus />
        </button>
      </div>

      <div className={styles.moviePoster}>
        <div className={styles.moviePosterOverlay}></div>
        <Image
          unoptimized
          src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
          alt={original_name}
          fill
        />
      </div>
    </div>
  );
}

export { FeaturedSerie };
