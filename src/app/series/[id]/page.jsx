import React from "react";
import { notFound } from "next/navigation";
import SerieDetails from "@/components/serie-details";

//* Query
import {
  getSerie,
  getSerieCredits,
  getSerieImages,
  getSerieVideos,
} from "@/services/series.service";


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

export async function generateMetadata({ params }) {
  const serieDetail = await getSerie(params.id);
  return {
    title: serieDetail.name,
  };
}

async function SeriePage({ params, searchParams }) {
  const serieDetail = await getSerie(params.id);
  if (serieDetail.success == false) {
    notFound();
  }

  // console.log(serieDetail);

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
      <SerieDetails
        name={serieDetail.name}
        original_name={serieDetail.original_name}
        date={formattedDate}
        status={serieDetail.status}
        original_language={serieDetail.original_language}
        runTime={serieDetail.episode_run_time}
        backdrop={serieDetail.backdrop_path}
        poster={serieDetail.poster_path}
        teaserKey={teaserKey}
        images={serieImages}
        genres={serieDetail.genres}
        overview={serieDetail.overview}
        director={directorPerson}
        cast={castNames}
        seasons={serieDetail.number_of_seasons}
        episodes={serieDetail.number_of_episodes}
      />
    </>
  );
}

export default SeriePage;
