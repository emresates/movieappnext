import React from "react";
import Link from "next/link";

import styles from "./styles.module.css";

function CategorieNamesSeries({ id, categories }) {
  return (
    <div className={styles.categories}>
      <Link
        style={{ display: id ? "flex" : "none" }}
        className={styles.clear}
        href={`/series`}
      >
        <div>Clear</div>
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          className={
            id != category.id ? styles.category : styles.categoryActive
          }
          href={`/categorie/${category.id}`}
        >
          <div>{category.name}</div>
        </Link>
      ))}
    </div>
  );
}

export { CategorieNamesSeries };
