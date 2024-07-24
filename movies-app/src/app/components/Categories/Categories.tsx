'use client';

import styles from "@/app/styles/categories.module.css";
import RowMovies from "./RowMovies";

export default function Categories() {
  const listMovies = [
    {
      name: 'Popular',
      url: 'https://api.themoviedb.org/3/trending/all/day'
    },
    {
      name: 'Now Playing',
      url: 'https://api.themoviedb.org/3/movie/now_playing'
    },
    {
      name: 'Upcoming',
      url: 'https://api.themoviedb.org/3/movie/upcoming'
    },
    {
      name: 'Top Rated',
      url: 'https://api.themoviedb.org/3/movie/top_rated'
    },
  ]

  return (
    <div className={styles.categories}>
      {listMovies.map((movie, index) => (
        <RowMovies key={index} url={movie.url}>{movie.name}</RowMovies>
      )
      )}
    </div>
  );
}
