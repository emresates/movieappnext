import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./styles.module.css";

function CategorieSection({ title, movies, type }) {
  console.log("Category Section Worked");

  // console.log(title);
  // console.log(movies);
  return (
    <div className={styles.categorieSection}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.movies}>
        {movies?.map((movie) => (
          <div className={styles.movie} key={movie.id}>
            <Link
              href={`${
                type === "serie" ? `/series/${movie.id}` : `/movies/${movie.id}`
              }`}
            >
              <Image
                fill
                unoptimized
                alt={movie.title}
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                    : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
                }
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export { CategorieSection };
