import React from "react";
import Skeleton from "@/components/skeleton";
import styles from "./styles.module.css";

function CategorieNamesSeriesLoading() {
  return (
    <div className={styles.categories}>
      {Array(16)
        .fill(null)
        .map((_, index) => (
          <Skeleton key={index} width={70} height={44} />
        ))}
    </div>
  );
}

export { CategorieNamesSeriesLoading };
