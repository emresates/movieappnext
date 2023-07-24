import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./styles.module.css";

function CategorieSection({ title, movies }) {
  console.log("Category Section Worked");

  return (
    <div className={styles.categorieSection}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.movies}>
        {movies?.map((movie) => (
          <div className={styles.movie} key={movie.id}>
            <Link
              href={`${
                title?.toLowerCase().includes("series")
                  ? `/series/${movie.id}`
                  : `/movies/${movie.id}`
              }`}
            >
              <Image
                fill
                unoptimized
                alt={movie.title}
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export { CategorieSection };
