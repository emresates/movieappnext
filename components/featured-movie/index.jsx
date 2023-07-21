import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";

import styles from "./styles.module.css";

function FeaturedMovie({ movie = {}, isCompact = true }) {
  const { title, overview, backdrop_path } = movie;

  return (
    <div className={styles.movieWrapper}>
      <h1 className={styles.movieTitle}>{title}</h1>
      <p
        className={`${styles.overview} ${
          isCompact ? styles.shortOverview : ""
        }`}
      >
        {overview}
      </p>

      <div className={styles.actionButtons}>
        <Link className={styles.playButton} href={`/movies/${movie.id}`}>
          Read
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
          alt={title}
          fill
        />
      </div>
    </div>
  );
}

// export { FeatureMovieLoading } from "./loading";
export { FeaturedMovie };
