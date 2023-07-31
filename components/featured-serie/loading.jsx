import React from "react";
import { Loading } from "@/components/loading";

import styles from "./styles.module.css";

function FeatureSerieLoading() {
  return (
    <div style={{ height: "35vh" }} className={styles.movieWrapper}>
      <Loading />
    </div>
  );
}

export { FeatureSerieLoading };
