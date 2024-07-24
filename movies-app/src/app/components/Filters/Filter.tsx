import Search from "@/app/icons/Search";
import styles from "@/app/styles/filters.module.css";
import Sort from "./Sort";
import Genres from "./Genres";
import React, { useState } from "react";
import useStore from "@/app/store/store";
import { getPopularMovies } from "@/app/api/moviesApi";

export default function Filter() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const { updateMovies } = useStore();

  const fetchMovies = async (url: string) => {
    try {
      const results = await getPopularMovies(url);
      updateMovies(results.results);
    } catch (err) {
      console.error('Error fetching movies:', err);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.trim() === "") return;

    setLoading(true);

    try {
      await fetchMovies(`https://api.themoviedb.org/3/search/movie?query=${query}`);
    } finally {
      setLoading(false);
      setQuery("");
    }
  };

  return (
    <div className={styles.filters}>
      <h2 className={styles.title}>Search</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          value={query}
          name="query"
          placeholder="Keywords"
          type="text"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" aria-label="Search" disabled={loading}>
          {loading ? "Loading..." : <Search />}
        </button>
      </form>

      <h2 className={styles.title}>Sort By</h2>
      <Sort />
      <h2 className={styles.titleGenres}>Genres</h2>
      <Genres />
    </div>
  );
}
