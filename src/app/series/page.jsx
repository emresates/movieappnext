import React from "react";

import {
  getTopRatedSeries,
  getPopularSeries,
  getSeriesAiringToday,
  getSeriesOntheAir,
  getSeriesCategories,
} from "@/services/series.service";
import HomeContainer from "@/containers/home";

async function Series() {
  const topRatedSeriesPromise = getTopRatedSeries();
  const popularSeriesPromise = getPopularSeries();
  const seriesAiringTodayPromise = getSeriesAiringToday();
  const seriesOntheAirPromise = getSeriesOntheAir();
  const seriesCategoriesPromise = await getSeriesCategories();

  const [
    { results: topRatedSeries },
    { results: popularSeries },
    { results: seriesAiringToday },
    { results: seriesOntheAir },
    { genres: seriesCategories },
  ] = await Promise.all([
    topRatedSeriesPromise,
    popularSeriesPromise,
    seriesAiringTodayPromise,
    seriesOntheAirPromise,
    seriesCategoriesPromise,
  ]);

  // console.log(seriesCategories);

  return (
    <HomeContainer
      topRatedSeries={topRatedSeries}
      popularSeries={popularSeries}
      seriesAiringToday={seriesAiringToday}
      seriesOntheAir={seriesOntheAir}
      seriesCategories={seriesCategories}
    />
  );
}

export default Series;
