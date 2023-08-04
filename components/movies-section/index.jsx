import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./styles.module.css";

export default function MoviesSection({ title, movies }) {
  return (
    <div className={styles.moviesSection}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.movies}>
        {movies.map((movie) =>
          movie.media_type == "person" ? (
            ""
          ) : (
            <div className={styles.movie} key={movie.id}>
              <Link
                href={`${
                  !movie.title ? `/series/${movie.id}` : `/movies/${movie.id}`
                }`}
              >
                <Image
                  fill
                  unoptimized
                  alt={movie.title || movie.name}
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                />
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
}
