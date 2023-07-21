import React from "react";
import Link from "next/link";

import styles from "./styles.module.css";

//* Icon
import { BiSolidMoviePlay } from "react-icons/bi";

function Header() {
  return (
    <header className={`${styles.header} container fluid`}>
      <div className={styles.headerWrapper}>
        <Link href="/" className={styles.logo}>
          <BiSolidMoviePlay /> Semovies
        </Link>
        <nav className={styles.navigationMenu}>
          <Link href="/movies">Movies</Link>
          <Link href="/series">Series</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/">Sign In</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
