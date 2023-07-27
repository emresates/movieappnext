"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import routes from "@/services/routes.json";

//* Style
import styles from "./styles.module.scss";

//* Icon
import { BiSolidMoviePlay } from "react-icons/bi";

function Header() {
  const pathname = usePathname();
  // console.log(pathname);
  // console.log(routes);

  const [searchTerm, setSearchTerm] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm.trim() !== "") {
      window.location.href = `/search?searchParams=${searchTerm}`;
    }
  };

  return (
    <header className={`${styles.header} container fluid`}>
      <div className={styles.headerWrapper}>
        <Link href="/" className={styles.logo}>
          <BiSolidMoviePlay /> Semovies
        </Link>
        <nav className={styles.navigationMenu}>
          <form onSubmit={handleSubmit}>
            <p>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.input}
                placeholder="Search.."
              />
            </p>
          </form>

          {/* <Link href="/movies">Movies</Link>
          <Link href="/series">Series</Link>
          <Link href="/">Sign In</Link>
          <Link href="/">Sing Up</Link> */}
          {routes.routes.map((route) => {
            const isActive = pathname.startsWith(route.path);
            return (
              <Link
                key={route.path}
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
