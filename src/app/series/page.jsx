import React from "react";

import {
  getTopRatedSeries,
  getPopularSeries,
  getSeriesAiringToday,
  getSeriesOntheAir,
} from "@/services/series.service";
import HomeContainer from "@/containers/home";

async function Series() {
  const topRatedSeriesPromise = getTopRatedSeries();
  const popularSeriesPromise = getPopularSeries();
  const seriesAiringTodayPromise = getSeriesAiringToday();
  const seriesOntheAirPromise = getSeriesOntheAir();

  const [
    { results: topRatedSeries },
    { results: popularSeries },
    { results: seriesAiringToday },
    { results: seriesOntheAir },
  ] = await Promise.all([
    topRatedSeriesPromise,
    popularSeriesPromise,
    seriesAiringTodayPromise,
    seriesOntheAirPromise,
  ]);

  return (
    <HomeContainer
      topRatedSeries={topRatedSeries}
      popularSeries={popularSeries}
      seriesAiringToday={seriesAiringToday}
      seriesOntheAir={seriesOntheAir}
    />
  );
}

export default Series;
