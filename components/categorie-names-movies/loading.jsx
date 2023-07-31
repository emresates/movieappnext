import React from "react";

import styles from "./styles.module.css";
import Skeleton from "@/components/skeleton";

function CategorieNamesMoviesLoading() {
  return (
    <div className={styles.categories}>
      {Array(19)
        .fill(null)
        .map((_, index) => (
          <Skeleton key={index} width={60} height={44} />
        ))}
    </div>
  );
}

export { CategorieNamesMoviesLoading };
