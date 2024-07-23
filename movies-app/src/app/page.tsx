'use client'

import styles from "@/app/styles/page.module.css";
import Header from "./components/Header/Header";
import Filter from "./components/Filters/Filter";
import Categories from "./components/Categories/Categories";
import { useEffect, useState } from "react";

export default function Home() {

  const [movies, setMovies] = useState([])

  useEffect(() => {
    const getMovies = () => {
      fetch('https://api.themoviedb.org/3/trending/all/day?api_key=d0033c5aae8948dfafeaaf98a3c145f4')
        .then(res => res.json())
        .then(listMovies => setMovies(listMovies.results))
    }
    getMovies()
  }, [])

  const hasMovies = movies.length > 0

  return (
    <main className={styles.main}>
      <Header />
      <section className={styles.section}>
        <Filter />
        {hasMovies ? 
        <Categories movies={movies}/>
        : <div>Cargando....</div>
      }
      </section>
    </main>
  );
}
