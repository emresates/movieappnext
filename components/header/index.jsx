"use client";
import React from "react";
import Link from "next/link";

import styles from "./styles.module.css";

//* Icon
import { BiSolidMoviePlay } from "react-icons/bi";
import { usePathname } from "next/navigation";
import routes from "@/services/routes.json";
function Header() {
  const pathname = usePathname();
  console.log(pathname);
  console.log(routes);
  return (
    <header className={`${styles.header} container fluid`}>
      <div className={styles.headerWrapper}>
        <Link href="/" className={styles.logo}>
          <BiSolidMoviePlay /> Semovies
        </Link>
        <nav className={styles.navigationMenu}>
          {/* <Link href="/movies">Movies</Link>
          <Link href="/series">Series</Link>
          <Link href="/">Sign In</Link>
          <Link href="/">Sing Up</Link> */}
          {routes.routes.map((route) => {
            const isActive = pathname.startsWith(route.path);
            return (
              <Link
                className={isActive ? styles.active : styles.passive}
                href={route.path}
              >
                {route.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export default Header;
