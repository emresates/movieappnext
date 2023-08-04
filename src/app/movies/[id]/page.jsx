import React from "react";
import { notFound } from "next/navigation";
import MovieDetails from "@/components/movie-details";

//* Services
import {
  getMovie,
  getMovieCredits,
  getMovieImages,
  getMovieVideos,
} from "@/services/movie.service";

export async function generateMetadata({ params }) {
  const movieDetail = await getMovie(params.id);
  return {
    title: movieDetail.title,
  };
}

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
  const hours = Math.floor(min / 60);
  const minutes = min % 60;

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
      <MovieDetails
        title={movieDetail.title}
        backdrop={movieDetail.backdrop_path}
        original_title={movieDetail.original_title}
        date={formattedDate}
        length={length}
        budget={formattedBudget}
        poster={movieDetail.poster_path}
        teaserKey={teaserKey}
        images={movieImages}
        genres={movieDetail.genres}
        overview={movieDetail.overview}
        directorPerson={directorPerson.name}
        castNames={castNames}
        productID={params.id}
      />
    </>
  );
}

export default MoviePage;
